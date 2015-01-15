'use strict';

/**
 * resumatorController
 * @module
 * @param {Object} dbConf Database configuration
 * @returns {{}}
 */
module.exports = function(dbConf){

    var mysql = require('mysql'),
        fs = require('fs');

    var log4js = require('log4js');
    //console log is loaded by default, so you won't normally need to do this
    //log4js.loadAppender('console');
    log4js.loadAppender('file');
    //log4js.addAppender(log4js.appenders.console());
    fs.mkdir('logs');
    log4js.addAppender(log4js.appenders.file('logs/gsui.log'), 'cheese');

    var logger = log4js.getLogger('cheese');

    if (!dbConf){
        logger.info('missing DB configuration for Resumator. not initializing');
        return {};
    }

    var pool = mysql.createPool(dbConf);

    var ResumatorController = {};
    ResumatorController.index = function(req, res){
        res.render('resumator/index');
    };

    ResumatorController.listJobs = function(req, res){
        res.send('ok');
    };

    ResumatorController.postJob = function(){
        pool.getConnection( function( err, conn ){
            conn.query('insert into jobs ');
            conn.release();
        });
    };

    ResumatorController.deleteJob = function(req, res){
        res.send('ok');
    };

    return ResumatorController;
};
