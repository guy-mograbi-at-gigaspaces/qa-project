'use strict';

angular.module('qaProjectApp')
    .directive('summaryBar', ['ResultsService',function (ResultsService) {
        var ResultsModel = ResultsService;
        return {
            template: '<div class="status-bar-widget" title="{{progress}}%"><span class="status-bar-widget-broken-failed">{{brokenValue}}</span> | <span class="status-bar-widget-failed">{{value}}</span></div>',
            scope: {
                'data': '='
            },
            restrict: 'AEC',
            link: function ($scope) {

                $scope.$watch('data', function (/*data*/) {

                    // we decided it is best to have 2 numbers to represent the total status.
                    // broken failed tests - the failes tests on the last run for a broken suites.
                    // failed tests - the number of failed tests for unbroken suites.
                    var failedTests = 0;
                    var brokenFailedTests = 0;

                    for (var s in ResultsModel.statuses()) {
                        $scope[s] = 0;

                    }
                    $scope.total = 0;
                    try {
                        if ($scope.data && $scope.data.length > 0) {
                            $.each($scope.data, function (index, item) {
                                var s = ResultsModel.status(item);
                                $scope[s]++;
                                $scope.total++;
                                if (s === 'FAILED') {
                                    failedTests += item.failedTests;
                                } else if (s === 'BROKEN') {
                                    brokenFailedTests += item.failedTests;
                                }

                            });
                        }
                    } catch (e) {
                        console.log('error');
                    }

                    $scope.progress = Math.floor(($scope.PASSED / ( $scope.total === 0 ? 1 : $scope.total ) ) * 100);
                    $scope.value = failedTests;
                    $scope.brokenValue = brokenFailedTests;
//                     $scope.value=100;
                    if ($scope.progress < 50) {
                        $scope.status = 'BAD';
                    }
                    else if ($scope.progress >= 50 && $scope.progress < 80) {
                        $scope.status = 'BETTER';
                    }
                    else if ($scope.progress === 100) {
                        $scope.status = 'PERFECT';
                    } else {
                        $scope.status = 'GOOD';
                    }


                }, true);


            }
        };
    }]);
