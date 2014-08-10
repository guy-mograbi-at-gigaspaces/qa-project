'use strict';

angular.module('qaProjectApp')
    .controller('SearchCtrl', ['$scope','ResultsService',function ($scope, ResultsService) {
        var ResultsModel = ResultsService;
        $scope.data = [];

        $scope.headers = ['suiteName', 'buildVersion', 'milestone', 'buildNumber', 'failedTests'];

        $scope.toggleHeader = function (header) {
            var headerIndex = $scope.headers.indexOf(header);
            if (headerIndex >= 0) {
                $scope.headers.splice(headerIndex, 1);
            } else {
                $scope.headers.push(header);
            }
        };


        ResultsModel.getResults(true).then(function (data) {
            var row0 = data[0];
            var headers = [];
            for (var i in row0) {
                headers.push(i);
            }
            $scope.availableHeaders = headers;

            $scope.data = data;
        });
    }]);
