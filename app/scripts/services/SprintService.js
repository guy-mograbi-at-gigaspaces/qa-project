'use strict';

angular.module('qaProjectApp')
    .service('SprintService', ['$http',function SprintService($http) {
        this.getDetails = function (sprintId, boardId) {
            return $http({ 'method': 'GET', 'url': '/backend/sprint/details', 'params': { 'sprintId': sprintId, 'boardId': boardId  } }).then(function (d) {
                console.log(['sprint', d.data]);
                return d.data;
            });
        };
        this.getBoards = function () {
            return $http({ 'method': 'GET', 'url': '/backend/sprint/boards' }).then(function (d) {
                return d.data;
            });
        };
        this.getSprints = function (boardId) {
            return $http({ 'method': 'GET', 'url': '/backend/sprint/list', 'params': { 'boardId': boardId  } }).then(function (d) {
                return d.data;
            });
        };
    }]);
