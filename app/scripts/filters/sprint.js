'use strict';

angular.module('qaProjectApp')
    .filter('sprint', function () {
        return function (data, status) {
            if (!data) {
                return data;
            }

            console.log(['filtering', status]);
            if (status === 'to do') {
                return $.grep(data.incompletedIssues, function (item/*, index*/) {
                    return item.statusId !== '5' && item.statusId !== '3';
                });
            } else if (status === 'in-progress') {
                return $.grep(data.incompletedIssues, function (item/*, index*/) {
                    return item.statusId === '3';
                });
            } else if (status === 'resolved') {
                return $.grep(data.incompletedIssues, function (item/*, index*/) {
                    return item.statusId === '5';
                });
            } else if (status === 'closed') {
                return data.completedIssues;
            }

        };
    });
