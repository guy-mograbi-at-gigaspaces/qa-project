'use strict';

var mysql = require('mysql');
var log4js = require('log4js');
var logger = log4js.getLogger('testResults');

module.exports = function(dbConf){

    var products;

    try {
        products = require('../app/common/products');
    }
    catch(e){}

    try {
        products = require('../common/products');
    }
    catch(e){}

    var pool = mysql.createPool(dbConf);

    var queries = {
        'versions' : '',
        'report': 'select sg.* from SgtestResult sg  ' +
            'join ( select buildVersion, max(timestamp) timestamp , type, suiteName from SgtestResult where buildVersion in ( ? ) and ( type in ( ? ) or type is NULL )  group by suiteName, jvmType  ) s ' +
            'on sg.suiteName = s.suiteName and sg.timestamp = s.timestamp where sg.buildVersion  in ( ?  ) and ( sg.type in ( ? ) or sg.type is NULL) and ( sg.jvmType not in ( ? ) or sg.jvmType is NULL )  and sg.suiteName in ( ? ) order by failedTests desc,timestamp desc ',
        'resultsForVersion': '',
        'results': ''
    };

    var testResultsModule = {};

    testResultsModule.results = function (request, response) {
        pool.getConnection(function (err, connection) {
            connection.query('select * from SgtestResult', function (err, rows/*, fields*/) {
                response.send(JSON.stringify(rows));
            });
            connection.release();
        });
    };

    testResultsModule.products = function(request, response){
        response.send(products.products);
    };

    testResultsModule.getBuildVersions = function (request, response) {
        pool.getConnection(function (err, connection) {
            connection.query('select distinct buildVersion from SgtestResult', function (err, rows/*, fields*/) {
                var res = [];
                for (var i = 0; i < rows.length; i++) {
                    res.push(rows[i].buildVersion);
                }
                response.send(JSON.stringify(res));
            });
            connection.release();
        });
    };

    testResultsModule.news = function (request, response) {
        pool.getConnection(function (err, connection) {
            console.log(['errors',err]);
            connection.query('select * from SgtestResult where suiteName in ( ? ) order by timestamp desc limit 10', [ products.suiteNames ],  function (err, results) {
                response.send(results);
            });
            connection.release();
        });
    };

    testResultsModule.newsSince = function (request, response) {
        var since = request.param('since');
        logger.info(['query', since]);
        pool.getConnection(function (err, connection) {
            connection.query('select * from SgtestResult where UNIX_TIMESTAMP(timestamp) > ? and suiteName in ( ? ) order by timestamp desc ', [new Date(since).getTime() / 1000, products.suiteNames ], function (err, results) {
                console.log(results);
                response.send(results);
            });
            connection.release();
        });
    };

    testResultsModule.versionResults = function (request, response) {
        var version = request.param('version'); // express way for getting URL params. for query params you need request.query
        pool.getConnection(function (err, connection) {
            connection.query('select * from SgtestResult where buildVersion = ?', [version], function (err, results) {
                response.send(results);
            });
            connection.release();
        });
    };

    testResultsModule.report = function(request,response){

        var product = request.query.product;
        var productObj = products.products[product.toUpperCase()];
        var versions = null;
        if ( typeof(request.query.version) !== 'undefined'){
            versions = [request.query.version];
        }else{
            try{
                versions = products.unifiedDashboard[product];
            }catch(e){ logger.error(e);}
        }

        try{
            if ( typeof(versions) === 'object'){ // handle array.. there must be a better way to do this
                versions = JSON.parse(versions);
            }
        }catch(e){}
        var type = productObj.type;
        var suitesName = productObj.suitesName;
        var ignoreJvmTypes = products.ignoreJvmTypes;
        pool.getConnection(function(err, connection){
            if ( err ){
                console.log('error getting connection from pool' + err.message );
            }else{
                connection.query(queries.report, [versions, type, versions, type, ignoreJvmTypes, suitesName], function( err, results ){
                    response.send(results);
                });
                connection.release();
            }
        });

    };

    return testResultsModule;
};
