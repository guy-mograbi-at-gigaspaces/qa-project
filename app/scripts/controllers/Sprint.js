'use strict';

angular.module('qaProjectApp')
    .controller('SprintCtrl', ['$scope','SprintService',function ($scope, SprintService) {

        function updateActiveSprints(activeSprint) {
            SprintService.getDetails(activeSprint.id /* sprintId */, 1 /* boardId */).then(function (d) {
                $scope.sprint = d.sprint;
                $scope.contents = d.contents;
            });
        }

        SprintService.getSprints(1 /* boardId */).then(function (d) {
            // find active sprint
            var activeSprint = null;
            $scope.sprints = d.sprints;
            for (var i = 0; i < d.sprints.length; i++) {
                var s = d.sprints[i];
                if (s.state === 'ACTIVE') {
                    activeSprint = s;
                }
            }
            updateActiveSprints(activeSprint);
        });
    }]);
