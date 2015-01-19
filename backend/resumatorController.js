'use strict';

var mysql = require('mysql');
var log4js = require('log4js');
var logger = log4js.getLogger('resumatorController');
/**
 * resumatorController
 * @module
 * @param {object} dbConf Database configuration
 * @returns {{}}
 */
module.exports = function (dbConf) {

    if (!dbConf) {
        logger.info('missing DB configuration for Resumator. not initializing');
        return {};
    }

    var pool = mysql.createPool(dbConf);

    var ResumatorController = {};
    ResumatorController.index = function (req, res) {
        res.render('resumator/index');
    };

    ResumatorController.listJobs = function (req, res) {
        res.send('ok');
    };

    ResumatorController.postJob = function () {
        pool.getConnection(function (err, conn) {
            conn.query('insert into jobs ');
            conn.release();
        });
    };

    ResumatorController.deleteJob = function (req, res) {
        res.send('ok');
    };

    return ResumatorController;
};
