'use strict';

angular.module('qaProjectApp')
    .directive('smartTable', function () {
        return{
            template: '<table>' +
                '<tr>' +
                '<td ng-repeat="header in tableHeaders" ng-click="orderTableBy(header)" ng-class="{\'orderedByThis\': orderHeader == header, \'desc\': orderDirection == 1, \'asc\':orderDirection == -1}">' +
                '{{header}}' +
                '</td>' +
                '</tr>' +
                '<tr ng-repeat="row in filteredData  = ( tableData | orderBy:orderHeader:orderDirection | filter:searchText ) | pagingFilter:currentPage:pageSize">' +
                '<td ng-repeat="header in tableHeaders">' +
                '{{row[header]}}' +
                '</td>' +
                '</tr>' +
                '</table>' +
                'Found {{filteredData.length}} items',
            restrict: 'AEC',
            transclude: true,
            scope: {
                'tableHeaders': '=',
                'tableData': '=',
                'searchText': '=',
                'orderBy': '=',
                'currentPage': '=',
                'pageSize': '='
            },
            link: function ($scope) {

                $scope.orderHeader = null;
                $scope.orderDirection = 1;

                $scope.orderTableBy = function (header) {
                    if ($scope.orderHeader === header && $scope.orderDirection === -1) {
                        $scope.orderHeader = null; // clear sort.
                    }
                    else if ($scope.orderHeader === header) {
                        $scope.orderDirection = -$scope.orderDirection;
                    } else {
                        $scope.orderHeader = header;
                        $scope.orderDirection = 1;
                    }
                };
            }
        };
    });
