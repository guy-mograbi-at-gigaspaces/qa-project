'use strict';

angular.module('qaProjectApp')
    .service('ResultsService', ['$q','$http',function ResultsService($q, $http) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        // a map between version and results
        var cachedResults = { };


        this.status = function (result) {
            return ResultsModule.status(result).name;
        };

        this.detailedResultsLink = function (result) {
            return ResultsModule.detailedResultsLink(result);
        };

        this.statuses = function () {
            return ResultsModule.statuses;
        };


        // returns  { "product" : ["version"] } format.
        this.getUnifiedDashboardProducts = function () {
            return ResultsModule.unifiedDashboard;
        };

        this.suiteName = function (test, product) {
            var label = ResultsModule.label(test, product);
            if (label === null) {
                return test.jvmType ? test.suiteName + '-' + test.jvmType : test.suiteName;
            }
            return label;
        };


        this.getResults = function (noCache) {
            if (!noCache) {
                var r = $q.defer();
                r.resolve($.map(cachedResults, function (v/*, k*/) {
                    return v;
                }));
                return r.promise;

            } else {
                return $http.get('/backend/dashboard/results').then(function (d) {
                    return d.data;
                });
            }
        };

        this.getReportForVersions = function (product, version) {
            return $http({'method': 'GET', 'url': '/backend/report', 'params': {'product': product, 'version': version} }).then(function (d) {
                return d.data;
            });
        };

        this.getNews = function () {
            return $http.get('/backend/news').then(function (d) {
                return d.data;
            });
        };

        this.getNewsSince = function (since) {

            return $http({ 'method': 'GET', 'url': '/backend/newsSince', 'params': { 'since': since  } }).then(function (d) {
                return d.data;
            });
        };


    }]);
