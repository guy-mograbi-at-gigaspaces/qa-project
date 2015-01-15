'use strict';

/**
 * metricController
 * @module
 * @param {Object} dbConf Database configuration
 * @returns {{}}
 */
module.exports = function (dbConf) {
    var mysql = require('mysql'),
        fs = require('fs'),
        products;

    try {
        products = require('../app/common/products');
    }
    catch (e) {}

    try {
        products = require('../common/products');
    }
    catch (e) {}


    var log4js = require('log4js');
    //console log is loaded by default, so you won't normally need to do this
    //log4js.loadAppender('console');
    log4js.loadAppender('file');
    //log4js.addAppender(log4js.appenders.console());
    fs.mkdir('logs');
    log4js.addAppender(log4js.appenders.file('logs/gsui.log'), 'cheese');

    var logger = log4js.getLogger('cheese');
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
