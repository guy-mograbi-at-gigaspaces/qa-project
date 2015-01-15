'use strict';

angular.module('qaProjectApp')
    .controller('UnifiedDashboardCtrl', ['$scope','ResultsService','$timeout','$route',function ($scope, ResultsService, $timeout, $route) {
        var ResultsModel = ResultsService;

        $scope.data = [];
        $scope.statuses = ResultsModel.statuses();
        $scope.product = { results: [] };

        $scope.reload = function () {
            $route.reload();
        };

        function has() {
            return $scope.product.hasOwnProperty('name');
        }

        function handleResults(product, version) {
            return function (results) {
                // find data for this product && version.
                var scopeItem = $.grep($scope.data, function (item/*, index*/) {
                    return item.name === product && item.version === version;
                });

                // if no data exists, we reset to null, if exists, we take that. grep returns a list.
                scopeItem = scopeItem.length === 0 ? null : scopeItem[0];
                if (scopeItem !== null) { // in case data exists, override.
                    scopeItem.results = results;
                } else { // in case data does no exists, push new.
                    scopeItem = {'version': version, 'name': product, 'results': results};
                    $scope.data.push(scopeItem);
                }

                $scope.data.sort(function (item1, item2) {
                    if (item1.name > item2.name) {
                        return -1;
                    }
                    if (item1.name < item2.name) {
                        return 1;
                    }
                    return 0;
                });

                // lets find out which milestone we are showing.
                // need to handle scenario where we have more than 1 milestone.. we choose the one that appears most often.
                var milestones = {};
                var biggestMilestone = null;
                for (var i in results) {
                    var item = results[i];
                    if (milestones.hasOwnProperty(item.milestone)) {
                        milestones[item.milestone]++;
                    } else {
                        milestones[item.milestone] = 0;
                    }
                    if (biggestMilestone === null) {
                        biggestMilestone = item.milestone;
                    }

                    else if (milestones[item.milestone] > milestones[biggestMilestone]) {
                        biggestMilestone = item.milestone;
                    }
                }
                scopeItem.milestone = biggestMilestone;
                $scope.product = $scope.data[0];
            };
        }

        function size() {
            return $scope.data.length - 1;
        }

        $scope.detailedResultsLink = function (result) {
            return ResultsModel.detailedResultsLink(result);
        };

        $scope.goTo = function (suite) {
            $.each($scope.data, function (index, item) {
                if (item === suite) {
                    $scope.product = item;
                }
            });
        };

        function currentIndex() {
            return $scope.data.indexOf($scope.product);
        }

        $scope.hasNext = function () {
            return has() && currentIndex() < size();
        };

        $scope.hasPrev = function () {
            return has() && currentIndex() > 0;
        };

        $scope.next = function () {
            if ($scope.hasNext()) {
                $scope.product = $scope.data[currentIndex() + 1];
            }
        };

        $scope.prev = function () {
            if ($scope.hasPrev()) {
                $scope.product = $scope.data[currentIndex() - 1];
            }
        };

        function refreshData() {
            // lets construct the following structure
            // data = [ { 'name' : , 'version' : , 'results' : [] } , ...  ]:
            var products = ResultsModel.getUnifiedDashboardProducts();
            for (var p in products) {
                for (var versionIndex = 0; versionIndex < products[p].length; versionIndex++) {
                    ResultsModel.getReportForVersions(p, products[p][versionIndex]).then(handleResults(p, products[p][versionIndex]));
                }
            }

            $timeout(refreshData, 1000 * 60 * 10);
        }

        refreshData();
    }]);
