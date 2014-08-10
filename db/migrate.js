var program = require('commander');

var exec = require('child_process').exec;


program
    .version('0.0.1')
    .option('-c, --config [file]', 'config file path', './dev/config.js')
    .option('--database <database>','the database name')
    .option('--rev [revision]', 'revision to migrate to - default to latest')
    .option('-f, --folder [folder]', 'the name of the migration files folder - default to db name')
//    .option('-b, --bbq', 'Add bbq sauce')
//    .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
    .parse(process.argv);


function main( migrator ){


    /////////////// Iterates over migrateScripts, runs each one and updates the revision accordingly.

    function runMigrateScripts( migrateScripts ) {

        var migrateScriptsIterator = new ArrayIterator( migrateScripts );

        function iterateScripts() {
            if (migrateScriptsIterator.hasNext()) {
                var mScript = migrateScriptsIterator.next();
                migrator.executeQuery(mScript, [], function (err) {
                    if (!!err) {
                        console.log("unable to execute [" + mScript + "]");
                        throw err;
                    } else {
                        migrator.updateRevision(mScript, function (err) {
                            if (!!err) {
                                console.log("script execution was successfully, but was unable to update version to : " + mScript);
                                throw (err);
                            } else {
                                iterateScripts();
                            }
                        })
                    }
                });
            }
        }
        iterateScripts();
    } /// end of runMigrateScripts

    /////////////////////////       Main script - get desired revision and act accordingly.

    migrator.getDesiredRevision(function (revision) {
        if (revision == "create") { // create revision means - lets create the schema
            migrator.createSchema();
        } else {
            migrator.getMigrateScripts(function (err, migrateScripts) {
                if ( !migrateScripts || migrateScripts.length == 0){
                    console.log("Nothing to migrate");
                    return;
                }
                if (!!err) {
                    console.log("failed to fetch migrate scripts");
                    throw err;
                } else {
                    console.log("will run the following scripts : " + migrateScripts);
                    runMigrateScripts(migrateScripts);
                }
            })
        }
    });
} // end of main

/************** Migrator ****************/

var Migrator = function( opts ){
    var self = this;
    var fs = require('fs');
    var path = require('path');

    /**************************     Variables       *****************************/


    ////////////////            Migration filters - help decide which migrate script is relevant for this migrate

    function getMigrateHandler( cb ) {

        if (self.migrateHandler == undefined) {
            var noOpFilters = {
                desiredRevisionSuitesOperation: function (x) {
                    console.log( this.name + " filter - desiredRevisionSuitesOperation: " + x);
                    return false;
                },
                currentRevisionSuitesOperation: function (x) {
                    console.log( this.name + " filter - currentRevisionSuitesOperation: " + x);
                    return false;
                },
                sort: function (x) {
                    console.log( this.name + " filter - sort: " + x);
                    return 0;
                },
                readQuery: function (filename) {
                    console.log( this.name + " filter - readQuery : " + filename);
                    return "noopQuery";
                },
                revisionAfterExecute : function( revision ){ console.log( this.name + " filter - revisionAfterExecute " + revision); return revision;  },
                name:"noop"
            };


            var upgradeFilters = {
                desiredRevisionSuitesOperation: function (x) {
                    return fileNameToMigrateRevision(x) <= this.desiredRevision;
                },
                currentRevisionSuitesOperation: function (x) {
                    return fileNameToMigrateRevision(x) > this.currentRevision;
                },
                sort: function (f1, f2) {
                    return fileNameToMigrateRevision(f1) - fileNameToMigrateRevision(f2);
                },
                readQuery: function (filename) { // assumes all migrate scripts have an upgrade script.. otherwise what's the point?
                    return readFile(filename).split("-- down")[0];
                },
                revisionAfterExecute : function( revision ){ return revision  },
                name:"upgrade"
            };

            var downgradeFilters = {
                desiredRevisionSuitesOperation: function (x) {
                    return fileNameToMigrateRevision(x) > this.desiredRevision;
                },
                currentRevisionSuitesOperation: function (x) {
                    return fileNameToMigrateRevision(x) <= this.currentRevision
                },
                sort: function (f1, f2) {
                    return fileNameToMigrateRevision(f2) - fileNameToMigrateRevision(f1);
                },
                readQuery: function (filename) {
                    debugger;
                    var fileContents = readFile(filename);
                    var contentArgs = fileContents.split("-- down");
                    return contentArgs.length < 2 ? "" : contentArgs[1];
                },
                revisionAfterExecute : function( revision ){
                    return revision - 1;
                },
                name:"downgrade"
            };

            self.getCurrentRevisionAsync( function( currentRevision ){
                self.getDesiredRevision( function( desiredRevision ){
                    self.migrateHandler = noOpFilters;
                    if (currentRevision < desiredRevision) {
                        self.migrateHandler = upgradeFilters;
                    } else if (currentRevision > desiredRevision) {
                        self.migrateHandler = downgradeFilters;
                    }

                    // like scope - lets put these variables here to be available everywhere.
                    self.migrateHandler["currentRevision"] = currentRevision;
                    self.migrateHandler["desiredRevision"] = desiredRevision;

                    cb( self.migrateHandler );
                });
            });

        }else{
            cb( self.migrateHandler );
        }


    }


    /**************************     UTILITIES       ******************************/


    /////////////////       Returns DB folder according to opts - uses the DB name as default


    function dbFolder(){
        return path.join( __dirname, opts.folder || opts.database);
    }

    //////////////////      Read file content - in dbFolder.


    function readFile( filename ){
        return fs.readFileSync( path.join(dbFolder(), filename)).toString();
    }


    //////////////////         Loads configuration


     function load( config, database ){
         self.dbConfig = require( config );
         if ( self.dbConfig == undefined){
             throw "could not load " + config ;
         }
         self.connConfig = self.dbConfig[database];
         if ( self.connConfig == undefined ){
             throw "did not get connection configuration from file [" + config + "] for DB [" + database + "]";
         }
         console.log(["loading configuration", self.connConfig]);
     }


    //////////////////          Retrieves the number from a migrate file with name format %d.sql


    function fileNameToMigrateRevision ( filename ){
        return ~~filename.split(".")[0];
    }

    //////////////////          True iff this file has a name format of  %d.sql

    function isMigrateFile( filename ){
        var args = filename.split(".");
        return args.length == 2 && args[1] == "sql" && !isNaN(args[0]);
    }

    ///////////////////         Gets all files in directory

    function readDirectory( cb ){
        if ( self.dirFiles == undefined ){
            fs.readdir( dbFolder(), function( err, res ){
                self.dirFiles = res;
                if ( !!err ){
                    console.log("unable to read " + dbFolder());
                    throw err;
                }
                cb(self.dirFiles);
            } );
        }else{
            cb(self.dirFiles);
        }
    }


    //////////////////          Executes queries


    function executeQueryFn(scriptContent, queryArgs, cb) {
        if ( !!scriptContent && scriptContent.trim().length > 0) {
            self.connConfig.executeQuery(scriptContent, queryArgs, cb);
        } else {
            console.log("nothing to execute");
            cb(null, null);
        }
    }


    //////////////////          Gets all migrate files in DB directory.

    function getDirMigrateFiles( cb ){
        if ( self.dirDirMigrateFiles == undefined ){
            readDirectory( function(res){
                self.dirDirMigrateFiles =  res.filter(function(x){ return isMigrateFile(x); });
                cb( self.dirDirMigrateFiles );
            })
        }else{
            cb(self.dirDirMigrateFiles);
        }
    }

    /////////////           Gets migrate implementation - upgrade / downgrade

    function getImplementation( cb ){

    }



    /*********************************      Members     ********************************/

    /////////////////           Simply runs create.sql


    self.createSchema = function(){
        console.log("creating the schema");
        self.connConfig.executeQuery( readFile("create.sql"),[], function( err, res ){ console.log([err,res])});
    };


    ////////////////////        Gets and sorts the scripts relevant for this migrate


    self.getMigrateScripts = function (cb) {
        if (self.migrateScripts == undefined) {
            getMigrateHandler(function (filters) {

                console.log("current revision : " + filters.currentRevision + ". desired revision : " + filters.desiredRevision );
                if ( filters.currentRevision == filters.desiredRevision){
                    cb([])
                } else {
                    readDirectory(function (files) {
                        self.migrateScripts = files.filter(function (x) {
                            return isMigrateFile(x) && filters.currentRevisionSuitesOperation(x) && filters.desiredRevisionSuitesOperation(x);
                        }).sort(filters.sort);
                        cb( null, self.migrateScripts);
                    });
                }
            });

        } else {
            cb(self.migrateScripts);
        }
    };

    ///////////////////         Gets the biggest revision number according to numbers on migrate scripts.

    self.getLatestRevision = function ( cb ) {
        if ( self.latestRevision == undefined ){

        self.latestRevision = 0;
        getDirMigrateFiles( function( migrateFiles ){
            migrateFiles.forEach(function (item, index) {
                var mRevision = fileNameToMigrateRevision(item);
                if (mRevision > self.latestRevision) {
                    self.latestRevision = mRevision;
                }
            });
        })
        }
        return cb( self.latestRevision );
    };


    ///////////////////         Updates the revision in the DB according to last file executed
    //////////////////          mScript - the last migrate script that executed successfully.

    self.updateRevision = function( mScript,  cb ){
        var mRevision = fileNameToMigrateRevision( mScript );
        getMigrateHandler( function(handler){
            var newRevision = handler.revisionAfterExecute(mRevision);
            console.log("updating revision to : " + newRevision );
            var updateVersion = readFile("updateVersion.sql");
            executeQueryFn( updateVersion, [newRevision] , cb );
        })

    };


    ///////////////////         Executes a query file

    self.executeQuery = function( mScript, queryArgs, cb ){
        console.log("executing script " + mScript + "...");
        getMigrateHandler( function(handler){
            var scriptContent = handler.readQuery( mScript );
            executeQueryFn( scriptContent, queryArgs, cb );
        });
    };

    //////////////////          Gets the revision we want to migrate to

    self.getDesiredRevision = function( cb ){
        if ( !opts.rev){
            self.getLatestRevision( cb );
        }else{
            cb(opts.rev);
        }
    };

    ////////////////            Gets the current revision as kept in the DB.


    self.getCurrentRevisionAsync = function( cb ){
        if (self.currentRevision == undefined) {
            self.connConfig.executeQuery(readFile("version.sql"), [], function (err, res) {
                if (!!err) {
                    throw err;
                }
                self.currentRevision = res[0].version;
                cb(self.currentRevision);
            });
        }else{
            cb(self.currentRevision);
        }
    };


    load(opts.config, opts.database);
};


/********************* Array Iterator ***************************************************/

var ArrayIterator = function( arr ){
    this.data = arr;
    this.i = -1;

    this.hasNext = function(){
        return this.i + 1 < this.data.length;
    };

    this.next = function(){
        this.i++;
        return this.data[this.i];
    }
};

main( new Migrator( program ) );