'use strict';

angular.module('qaProjectApp')
    .controller('NewsCtrl', ['$timeout','$scope','ResultsService',function ($timeout, $scope, ResultsService) {

        var ResultsModel = ResultsService;

        $scope.updateInterval = 3000;
        // get new items.
        function updateNewsItems() {
            if (typeof($scope.newsItems) !== 'undefined' && $scope.newsItems !== null && $scope.newsItems.length > 0) {
                var since = $scope.newsItems[0].timestamp;
                ResultsModel.getNewsSince(since).then(function (newItems) {
                    for (var i = newItems.length - 1; i >= 0; i--) {
                        $scope.newsItems.unshift(newItems[i]);
                    }
                    try {
                        $scope.newsItems.splice(5);
                    } catch (e) {
                    }
                    $timeout(updateNewsItems, $scope.updateInterval);
                });
            } else {
                ResultsModel.getNews().then(function (d) {
                    $timeout(updateNewsItems, $scope.updateInterval);
                    $scope.newsItems = d;
                });
            }
        }
        updateNewsItems();

        $('marquee').each(function (index, item) {
            var stopEvery = $(item).attr('stop-every');
            var stopFor = $(item).attr('stop-for');

            function stopStartMarquee(item, stop, stopEvery, stopFor) {
                console.log(['marquee', item, stop, stopEvery, stopFor ]);
                if ( stop ){
                    item.stop();
                } else{
                    item.start();
                }
                setTimeout(function () {
                    stopStartMarquee(item, !stop, stopEvery, stopFor);
                }, stop ? stopFor : stopEvery);
            }

            if (typeof(stopEvery) !== 'undefined' && typeof(stopFor) !== 'undefined') {
                setTimeout(function () {
                    stopStartMarquee(item, true, stopEvery, stopFor);
                }, stopEvery);
            }
        });
    }]);
