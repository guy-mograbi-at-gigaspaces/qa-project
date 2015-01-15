'use strict';

angular.module('qaProjectApp')
    .controller('LinksCtrl', ['$scope','$http',function ($scope, $http) {

        $scope.page = {};

        $scope.page.items = [
            { 'address': 'qb.gsdev.info:8810', 'label': 'quickbuild'},
            { 'address': 'builds.gsdev.info', 'label': 'UI Builds'},
            { 'address': 'gigapsaces.atlassian.net', 'label': 'Gigaspaces JIRA'},
            { 'address': 'cloudifysource.atlassian.net', 'label': 'Cloudify JIRA'},
            { 'address': 'nexus.gsdev.info:8088/nexus', 'label': 'Nexus'},
            { 'address' : 'influx.gsdev.info:8083', 'label' : 'Influx' }
        ];


        $scope.submitSuggestion = function () {
            $http.post('/backend/links/suggest', {suggestion: $scope.suggest}, function (result) {
                console.log(result.data);
            });
        };


    }]);
