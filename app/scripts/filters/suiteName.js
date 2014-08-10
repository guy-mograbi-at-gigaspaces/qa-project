'use strict';

angular.module('qaProjectApp')
    .filter('suiteName', ['ResultsService',function (ResultsService) {
        var ResultsModel = ResultsService;
        return function (item, product) {
            return ResultsModel.suiteName(item, product);
        };
    }]);
