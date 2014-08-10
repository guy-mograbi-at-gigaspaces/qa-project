'use strict';

angular.module('qaProjectApp')
    .controller('RepositoryCtrl', ['$scope','$http',function ($scope, $http) {
        $http.get('/backend/repository/links').then(function (result) {

            $scope.repository = result.data;
        });

        $scope.type = 'releases';


        var empty = [];
        $scope.getEntries = function () {

            var suffixFilter = function (/*item, index*/) {
                return true;
            }; //

            if ($scope.suffix === 'zip') {
                suffixFilter = function (item/*, index*/) {
                    return item.key.indexOf('zip') !== -1;
                }; //
            } else if ($scope.suffix === 'tar') {
                suffixFilter = function (item/*, index*/) {
                    return item.key.indexOf('tar') !== -1 ;
                }; //
            }

            var filter = function (/*item, index*/) {
                return true;
            }; // all
            if ($scope.type === 'milestone') {
                filter = function (item/*, index*/) {
                    return item.key.indexOf('SNAPSHOT') < 0 ;
                };
            } else if ($scope.type === 'snapshots') {
                filter = function (item/*, index*/) {
                    return item.key.indexOf('SNAPSHOT') > 0  ;
                };
            } else if ($scope.type === 'community') {
                filter = function (item/*, index*/) {
                    return item.key.indexOf('community') > 0 ;
                };
            } else if ($scope.type === 'releases') {
                filter = function (item/*, index*/) {
                    return item.key.indexOf('RELEASE') > 0 ;
                };
            }

            var combinedFilter = function (item, index) {
                return suffixFilter(item, index) && filter(item, index);
            };

            if (!$scope.repository) {
                return empty;
            }
            return $.grep($scope.repository, combinedFilter);
        };

        $scope.getEntryName = function (entry) {
            var key = entry.key;
            return key.substring(key.lastIndexOf('/'));
        };
    }]);
