'use strict';

var mysql = require('mysql');
var log4js = require('log4js');
var logger = log4js.getLogger('metricController');

/**
 * metricController
 * @module
 * @param {object} dbConf Database configuration
 * @returns {{}}
 */
module.exports = function (dbConf) {

    var products;

    try {
        products = require('../app/common/products');
    }
    catch (e) {}

    try {
        products = require('../common/products');
    }
    catch (e) {}

    var pool = mysql.createPool(dbConf);
    //var queries = {};
    var metricController = {};

    metricController.versions = function (req, res) {
        pool.getConnection(function (err, conn) {
            conn.query('select distinct(buildVersion) from SamplerResult', function (err, rows/*, fields*/) {
                res.send(JSON.stringify(rows));
            });
            conn.release();
        });
    };

    metricController.combinations = function (req, res) {
        pool.getConnection(function (err, conn) {
            conn.query('select * from SamplerResult group by operation, mode, threads, ObjectType, spaceTopology, local, TxnType', function (err, rows/*, fields*/) {
                res.send(JSON.stringify(rows));
            });
            conn.release();
        });
    };

    metricController.data = function (req, res) {
        var slice = JSON.parse(req.param('slice'));
        logger.info('slicing according to ' + slice);
        pool.getConnection(function (err, conn) {
            var whereClause = [];
            var whereValues = [];
            for (var k in slice) {
                whereClause.push(k + ' = ?');
                whereValues.push(slice[k]);
            }
            conn.query('select *, UNIX_TIMESTAMP(timestamp)*1000 ts from SamplerResult where ' + whereClause.join(' and ') + ' order by buildVersion, timestamp desc ', whereValues, function (err, rows/*, fields*/) {
                res.send(JSON.stringify(rows));
            });
            conn.release();
        });
    };

    return metricController;
};
