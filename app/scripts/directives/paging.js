'use strict';

angular.module('qaProjectApp')
    .directive('paging', function () {
        return {
            template: '<div><button ng-disabled="!hasPrevious()" ng-click="onPrev()"> Previous </button> {{start()}} - {{end()}} out of {{size()}} <button ng-disabled="!hasNext()" ng-click="onNext()"> Next </button><div ng-transclude=""></div> </div>',
            restrict: 'AEC',
            transclude: true,
            scope: {
                'currentPage': '=',
                'pageSize': '=',
                'data': '='

            },
            link: function ($scope/*, element, attrs*/) {

                $scope.size = function () {
                    return $scope.data.length;
                };

                $scope.end = function () {
                    return $scope.start() + $scope.pageSize;
                };

                $scope.start = function () {
                    return $scope.currentPage * $scope.pageSize;
                };

                $scope.page = function () {
                    return !!$scope.size() ? ( $scope.currentPage + 1 ) : 0;
                };

                $scope.hasNext = function () {
                    return $scope.page() < ( $scope.size() / $scope.pageSize );
                };

                $scope.onNext = function () {
                    if ($scope.hasNext()) { // fail safe
                        $scope.currentPage = parseInt($scope.currentPage, 10) + 1;
                    }
                };

                $scope.hasPrevious = function () {

                    return !!$scope.currentPage;
                };

                $scope.onPrev = function () {
                    if ($scope.hasPrevious()) {
                        $scope.currentPage = $scope.currentPage - 1;
                    }
                };

                try {
                    if (typeof($scope.data) === 'undefined') {
                        $scope.data = [];
                    }
                    if (typeof($scope.currentPage) === 'undefined') {
                        $scope.currentPage = 0;
                    }
                    if (typeof($scope.pageSize) === 'undefined') {
                        $scope.pageSize = 10;
                    }
                } catch (e) {
                    console.log(e);
                }
            }

        };
    });
