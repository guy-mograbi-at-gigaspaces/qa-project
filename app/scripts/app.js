'use strict';

angular.module('qaProjectApp', [])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'UnifiedDashboardCtrl',
                templateUrl: '/views/dashboard/unified.html'
            })
            .when('/unified-dashboard', {
                controller: 'UnifiedDashboardCtrl',
                templateUrl: '/views/dashboard/unified.html'
            })
            .when('/repository', {
                controller: 'RepositoryCtrl',
                templateUrl: '/views/dashboard/repository.html'
            })
            .when('/report', {
                controller: 'ReportCtrl',
                templateUrl: '/views/dashboard/report.html'
            }).when('/search', {
                controller: 'SearchCtrl',
                templateUrl: '/views/dashboard/search.html'
            }).when('/metric', {
                controller: 'MetricCtrl',
                templateUrl: '/views/metric/index.html'
            }).when('/sprint', {
                controller: 'SprintCtrl',
                templateUrl: '/views/sprint/index.html'
            }).when('/uptime', {
//                controller: 'UptimeCtrl',
                templateUrl: '/views/dashboard/uptime.html'
            }).when('/links',{
                'controller':'LinksCtrl',
                'templateUrl':'/views/links.html'
            });
    }]);
