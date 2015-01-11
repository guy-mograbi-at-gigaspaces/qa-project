'use strict';

angular.module('qaProjectApp')
    .controller('MetricCtrl', ['$scope','MetricService',function ($scope, MetricService) {
        var MetricModel = MetricService;

        $scope.zoomDataPrettyPrint = function () {
            return JSON.stringify($scope.zoomData, undefined, 2);
        };

        $scope.chartOpts = {
            series: {
                lines: { show: true },
                points: {show: true}
            },
            zoom: {
                interactive: true
            },
            xaxis: {
                ticks: []
            },
            pan: {
                interactive: true
            },
            grid: {
                hoverable: true,
                clickable: true
            }
        };


        $scope.chartItemClicked = function (d) {
            $scope.zoomData = $scope.slicedData[d.item.dataIndex];
        };

        function initOptions() {
            $scope.options = { 'operation': [], 'mode': [], 'threads': [], 'objectType': [], 'spaceTopology': [], 'local': [], 'txnType': []};
        }

        initOptions();
        $scope.optionsData = [];
        $scope.slice = {};


        function populateOptions() {
            initOptions();


            var ds = $.grep($scope.optionsData, function (item /*, index */ ) {

                for (var k in $scope.slice) {
                    if ($scope.slice[k] !== item[k]) {
                        return false;
                    }
                }
                return true;
            });

            for (var i = 0; i < ds.length; i++) {
                var d = ds[i];
                for (var key in $scope.options) {
                    if ($scope.options[key].indexOf(d[key]) < 0) {
                        $scope.options[key].push(d[key]);
                    }
                }
            }
        }

        MetricModel.getCombinations().then(function (ds) {
            $scope.optionsData = ds;
            populateOptions();

        });

        $scope.optionKeys = function () {
            return $.map($scope.options, function (item, index) {
                return index;
            });
        };

        function clearChart() {
            $scope.slicedData = null;
            $scope.zoomData = null;
        }

        $scope.optionValues = function (optionKey) {
            return $scope.options[optionKey];
        };


//    $scope.chartData =  [ {'label':'guy',data:[[1,2],[3,4]]} ];//{ 'text': 'Metric', 'subtitle': 'my subtitle', 'series': [] };

        function processDataForChart(d) {
            $scope.chartOpts.xaxis.ticks = [];
            var lastTickLabel = null;
            var subtitleArgs = [];
            for (var k in $scope.options) {
                subtitleArgs.push(k + ' = ' + $scope.options[k][0]);
            }
            var chart = { 'text': 'Metric', 'subtitle': subtitleArgs.join(' , '), 'series': [] };
            var series = {'avgTP': []};

            var jump = 0;
            $.each(d, function (index, item) {

                if (lastTickLabel !== item.buildVersion) {
                    jump += 10;
                    lastTickLabel = item.buildVersion;
                    $scope.chartOpts.xaxis.ticks.push([index + jump, item.buildVersion]);
                }

                $.each(item, function (cat, stat) {
                    if (typeof(series[cat]) !== 'undefined') {
                        series[cat].push([index + jump, stat === null ? 0 : stat]);
                    }
                });
            });

            $.each(series, function (name, data) {
                chart.series.push({'label': name, 'data': data });
            });

            $scope.chartData = chart.series;
        }

        $scope.processDataForChart = processDataForChart;

        $scope.sliceData = function () {
            if ($scope.canShowChart()) {
                if ($scope.slicedData === null) {
                    MetricModel.getSlicedData($scope.slice).then(function (d) {
                        processDataForChart(d);
                        $scope.slicedData = d;
                        return d;
                    });
                }
                return true;
            } else {
                clearChart();
                return false;
            }
        };

        $scope.addSlice = function (key, value) {
            $scope.slice[key] = value;
            populateOptions();
        };

        $scope.clearSlice = function (key) {
            delete $scope.slice[key];
            clearChart();
            populateOptions();
        };

        $scope.canShowChart = function () {
            $scope.chartError = null;
            for (var k in $scope.options) {
                if ($scope.options[k].length !== 1) {
                    $scope.chartError = 'Please select a value for "' + k + '"';
                    return false;
                }
            }
            return true;
        };
    }]);
