'use strict';

angular.module('qaProjectApp')
    .directive('flotChart', function () {
        return {
            restrict: 'A',

            scope: {
                chart: '=',
                opts: '=',
                chartClick: '&'
            },
            link: function (scope, elem/*, attrs*/) {
//            var plot = null;
                console.log('in flot chart');
                elem = $(elem);
                elem.on('plotclick', function (event, pos, item) {
                    scope.$apply(function () {
                        if (typeof(scope.chartClick) === 'function') {
                            console.log(['triggering chartClick', typeof(scope.chartClick)]);
                            scope.chartClick({ 'data': { 'pos': pos, 'item': item}});
                        } else {
                            console.log('click handler is not defined');
                        }
                    });

                });

                function setupFlot(opts, chart) {
                    elem.empty();
//                if (!plot) {
                    try {
                        console.log(['opts are', scope.opts]);
                        $.plot(elem, chart, opts || {});
//                        plot = $.plot(elem, v, scope.opts||{});
                        elem.show();
                    } catch (e) {
                        console.log(['error while painting chart', e]);
                    }
//                } else {
//                    plot.setData(v);
//                    plot.setupGrid();
//                    plot.draw();
//                }
                }

                scope.$watch('opts', function (v) {
                    setupFlot(v, scope.chart);
                });

                scope.$watch('chart', function (v) {
                    setupFlot(scope.opts, v);
                }, true);
            }
        };
    });
