'use strict';

angular.module('qaProjectApp')
    .controller('ReportCtrl', ['$scope','ResultsService','$routeParams',function ($scope, ResultsService, $routeParams) {
        var ResultsModel = ResultsService;
        console.log(['route params', $routeParams ]);

        $scope.project = $routeParams.project;
        $scope.version = $routeParams.version;

        $scope.reportItem = ResultsModel.getReportForVersions($scope.project, $scope.version);

        $scope.showReportDetails = function (report) {
            $scope.reportDetails = report;
        };
    }]);
