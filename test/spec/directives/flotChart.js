'use strict';

describe('Directive: flotChart', function () {

  var element, scope;

  beforeEach(module('qaProjectApp'));

  describe('Test setup', function() {
    it('should create directive element', inject(function($rootScope, $compile){
      scope = $rootScope.$new();
      scope.chartData = [];
      scope.chartOpts = {
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
      element = $compile(angular.element('<div flot-chart chart="chartData" opts="chartOpts" ng-model="chartData"></div>'))(scope);

      $rootScope.$apply();

      scope = element.isolateScope();
      scope.$apply();
    }));
  });

  describe('Directive tests', function() {

    it('should create scope object', function() {
      expect(scope).not.toBeUndefined();
    });

  });
});
