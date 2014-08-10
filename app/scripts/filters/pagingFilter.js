'use strict';

angular.module('qaProjectApp')
    .filter('pagingFilter', function () {
        return function (input, pageSize, currentPage) {
            return input ? input.slice(currentPage * pageSize, currentPage * ( pageSize + 1 )) : [];
        };
    });
