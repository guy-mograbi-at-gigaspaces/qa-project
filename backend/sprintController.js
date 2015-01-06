'use strict';

var https = require('https'),
    /*http = require('http'),*/
    extend = require('extend'),
    knox = require('knox'),
    config = require('./dev/conf');

var clients = [];
for (var s3Index = 0; s3Index < config.s3.length; s3Index++) {
    clients.push(knox.createClient(config.s3[s3Index]));
}

function basicOptions(path) {
    return {
        host: config.jira.domain,
        port: 443,
        path: path,
        headers:{
            'Authorization':'Basic ' + config.jira.user,
            'Content-Type':'application/json',
            'Content-Length':0
        }
    };
}

function handleHttpResponse(res, resp) {
    // res - the response I am writing to
    // resp - the response I am reading from
    resp.on('data', function(chunk){
        res.write(chunk);
    });

    resp.on('end',function(){
        res.release();
    });
}

function makeRequest(path, res, opts) {
    var options = extend(basicOptions( path ), opts || {} );
    console.log(options);
    https.get( options, function(resp){
        handleHttpResponse( res, resp );
    }).on('error' , function(e){
            console.log('Got error:' + e.message);
            res.send(500, e.message);
        });
}

exports.getConfig = function( req, res ){
    res.send(config.jira.domain);
};

exports.getSprint = function( req, res ){
    makeRequest('https://gigaspaces.atlassian.net/rest/greenhopper/1.0/rapid/charts/sprintreport?rapidViewId=' + req.param('boardId') + '&sprintId=' + req.param('sprintId'), res );

};

exports.getSprints = function( req, res ){
    makeRequest('https://gigaspaces.atlassian.net/rest/greenhopper/1.0/sprintquery/' + req.param('boardId') , res);
};

exports.getBoards = function( req, res ){
    makeRequest('https://gigaspaces.atlassian.net/rest/greenhopper/1.0/rapidview', res );
};

var linksCache = [];
exports.getLinks = function(req, res){
    var shouldForce = req.param('force');
    if (shouldForce === 'true'){
        linksCache = [];
    }
    if ( linksCache.length > 0 ){
        console.log('using cached version');
        res.send(linksCache);
        return;
    }

    var contents = [];
    var clientsDone = [];

    function _list( client, opts ){
        console.log(['listing',client.bucket,opts]);
        try {
            client.list(opts, function(err, data){
                console.log(data.Contents.length);
                contents = contents.concat( data.Contents);
                if (data.IsTruncated){
                    _list(client,{ marker : data.Contents[data.Contents.length-1].Key});
                } else {
                    clientsDone.push(client.bucket);
                    console.log('sending to client');
                    var result = [];
                    for (var i=0; i < contents.length; i++) {
                        var entry = contents[i];
                        if (parseInt(entry.Size) > 0){
                            result.push({'key':entry.Key,'size':parseInt(entry.Size),'lastModified': new Date(entry.LastModified).getTime()});
                        }

                    }
                    if (clientsDone.length === clients.length){
                        console.log(result.length);
                        linksCache = result;
                        res.send(result);
                    } else {
                        console.log(['clients that are done', clientsDone ]);
                    }
                }
            });
        }
        catch(e){ console.log('got an error'); res.send('got an error'); }
    }

    for ( var clientsIndex = 0; clientsIndex < clients.length; clientsIndex++ ){
        _list(clients[clientsIndex],{});
    }

};
