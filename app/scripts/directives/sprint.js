'use strict';

angular.module('qaProjectApp')
    .directive('sprint', function () {
        return {
            restrict: 'A',
            transclude: true,
            templateUrl: 'views/sprint/_sprint.html',
            scope: {
                'data': '=',
                'type': '@'
            },
            link: function () {

            }
        };
    });
