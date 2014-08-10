'use strict';

angular.module('qaProjectApp')
    .service('MetricService',['$http', function MetricService( $http ) {
        this.getCombinations = function () {
            return $http({ 'method': 'GET', 'url': '/backend/metric/combinations' }).then(function (d) {
                return d.data;
            });
        };

        this.getSlicedData = function (slice) {
            return $http({'method': 'GET', 'url': '/backend/metric/data', 'params': {'slice': slice }}).then(function (d) {
                return d.data;
            });
        };
    }]);
