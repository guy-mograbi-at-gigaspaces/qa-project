'use strict';

angular.module('qaProjectApp')
    .controller('DashboardCtrl', ['$timeout','$scope','$location','$routeParams','$rootScope','ResultsService',function ($timeout, $scope, $location, $routeParams, $rootScope, ResultsService) {
        var ResultsModel = ResultsService;


        $scope.expand = {'test': null};
//    $scope.name = "my name";
//     $scope.myChart = [{"label":"passed","data":[[0,31],[1,33]]}];
//
//
//    function UniqueArray(){
//        var values = [];
//
//        this.add = function( item ){
//            if ($.inArray(item, values) < 0){
//                values.push(item);
//            }
//        };
//
//        this.values = function( ){
//            return values;
//        }
//    }
//
//
//    /*******************************************************************************************
//     *
//     * Now, lets handle the statistics.
//     *   -- First step - get the versions.
//     *   -- Then simply save the data from the backend.
//     *   -- Then render only the charts you view.
//     *   -- Cache the charts you've shown already for better performance
//     *
//     *********************************************************************************************/
//
//    // will return data as { "version" : { "suiteName" : [ { "passedTests" : X ,
//    // "failedTests" : Y, "suspectedTests" : Z ,
//    // "timestamp" : aaa }, {} ] } }
//    function processData( rawData ){
//        var res = {};
//        console.log("process data start");
//        var uniqueVersions = new UniqueArray();
//
//        $.each( rawData, function(index, item){
//            var version = item["buildVersion"];
//            var suiteName = item["suiteName"];
//
//            uniqueVersions.add(version);
//
//            if ( typeof(res[version]) == "undefined"){
//                //console.log(["creating version",version]);
//                res[version] = {};
//            }
//            if ( typeof(res[version][suiteName]) == "undefined"){
//                //console.log(["creating suite",version, suiteName]);
//                res[version][suiteName] = [];
//            }
//            res[version][suiteName].push({"passed": item["passedTests"], "failed" : item["failedTests"], "suspected": item["suspected"], "total" : item["total"]})
//        });
//        // console.log(["uniqueVersions", uniqueVersions]);
//        console.log("process data stop");
//        return { "versions" : uniqueVersions.values(), "stats" : processedDataToChart(res)};
//    }
//
//    /**   turns processed data into :
//     * {
//           "title": { "text": "Israel love Iran" }, "subtitle": { "text": "Source: <a href=\"https://www.facebook.com/israellovesiran\">Israel loves iran on fb</a>" },
//           "xAxis": { "labels": {} },
//           "tooltip": {},
//           "plotOptions": { "area": { "pointStart": 1940, "marker": { "enabled": false, "symbol": "circle",
//                 "radius": 2, "states": { "hover": { "enabled": true } } } } },
//           "series": [
//             { "name": "Israel", "data": [ 400, 194, 301, 130, 300 ] },
//             { "name": "Iran", "data": [ 123, 325, 120, 300, 300 ] } ]
//         }
//     * @param data - the processed data.
//     * @return {{}}
//     **/
//    function processedDataToChart(data) {
//        console.log("process to chart start");
//        var res = [];
//
//        for (var version in data) {
//            for (var suite in data[version]) {
//              //  console.log(["creating chart for ", version, suite ]);
//                var chart = { "text": suite, "subtitle": version, "series": [] };
//                var series = {"passed": [], "failed": [], "suspected": [], "total": []};
//                $.each(data[version][suite], function (index, item) {
//                    $.each(item, function (cat, stat) {
//                        if (typeof(series[cat]) != "undefined" ) {
//                            series[cat].push([index,stat == null ? 0 : stat]);
//                        }
//                    });
//                });
//
//                $.each(series, function (name, data) {
//                    chart.series.push({"label": name, "data": data });
//                });
//                res.push(chart);
//            }
//
//        }
//      //  console.log(res);
//        console.log("process to chart stop");
//
//        return res;
//    }
//
//    $scope.setChartVersion= function( newChartVersion ){
//        $scope.chartVersion = newChartVersion;
//    } ;
//    $scope.tests = {"versions":[]};
//
//    $scope.filterResult = function(item){
//        return $scope.chartVersion == 'all' || item.subtitle == $scope.chartVersion;
//    };
//
//    $scope.tests.versions = ResultsModel.getVersions().then( function(d){
//
//        $scope.chartVersion = d[d.length-1];
//
//        $timeout( function(){
//
//            $.each( d, function(index,item){
//                console.log(["getting result for ",item]);
//               ResultsModel.getResultsForVersion( item );
//            });
//        }, 1);
//
//        return d;
//    });
//
//    $scope.$watch('chartVersion', function(){
//        console.log(["updating chart version to ", $scope.chartVersion]);
//
//        var p;
//        if ( $scope.chartVersion == 'all'){
//            p = ResultsModel.getResults();
//        }else{
//            p = ResultsModel.getResultsForVersion( $scope.chartVersion);
//        }
//        p.then( function(d){
//            $scope.results = processData(d).stats;
//        });
//    });

        $scope.getItemsByState = function (items, state) {

            if (typeof(items) === 'undefined') {
                return [];
            }
            var result = [];
            $.each(items, function (index, item) {
                if (ResultsModel.status(item) === state) {
                    result.push(item);

                }
            });
            return result;
        };
        $scope.project = $routeParams.project;
        $scope.version = $routeParams.version;
        $scope.item = ResultsModel.getReportForVersions($routeParams.project, $routeParams.version);
    }]);
