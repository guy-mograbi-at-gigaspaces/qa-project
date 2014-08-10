'use strict';

angular.module('qaProjectApp')
    .filter('status', ['ResultsService',function (ResultsService) {
        var ResultsModel = ResultsService;
        return function (item) { // output the status as string for given item
            return ResultsModel.status(item);
        };
    }]);
