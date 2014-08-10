'use strict';

angular.module('qaProjectApp')
    .filter('statusFilter', ['ResultsService',function (ResultsService) {  // return only elements with given status
        var ResultsModel = ResultsService;
        return function (items, status) {

            if (typeof(items) !== 'undefined' && items !== null) {
                return $.grep(items, function (item/*, index*/) {
                    try {
                        return ResultsModel.status(item) === status;
                    } catch (e) {
                        console.log('error');
                    }
                });

            }
        };
    }]);
