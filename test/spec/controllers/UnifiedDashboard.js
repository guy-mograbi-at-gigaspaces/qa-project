'use strict';

describe('Controller: UnifiedDashboardCtrl', function () {

  var UnifiedDashboardCtrl, scope;

  // load the controller's module
  beforeEach(module('qaProjectApp'));

  describe('Test setup', function() {
    it('', inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      scope.data = [
        {
          "version": [
            "10.1.0"
          ],
          "name": "xap",
          "results": [
            {
              "buildNumber": "12589-338",
              "buildVersion": "10.1.0",
              "milestone": "m9",
              "suiteName": "DotNet v4.0",
              "failedTests": 1358,
              "fullBuildLog": null,
              "jvmType": "dotnet_4.0_x86",
              "orphans": 0,
              "passedTests": 619,
              "skippedTests": 49,
              "suiteDuration": 6626634,
              "suiteReportLink": "http://192.168.10.6:8090/display/TGRID/DotNet%20v4.0%2012589-338",
              "suspectedTests": 0,
              "timestamp": "2015-01-04T00:09:38.000Z",
              "totalTestsRun": 1977,
              "type": "tgrid"
            },
            {
              "buildNumber": "12589-74",
              "buildVersion": "10.1.0",
              "milestone": "m8",
              "suiteName": "Nightly Regression",
              "failedTests": 153,
              "fullBuildLog": null,
              "jvmType": "9_Sun7_SSD",
              "orphans": 0,
              "passedTests": 2025,
              "skippedTests": 367,
              "suiteDuration": 107813693,
              "suiteReportLink": "http://192.168.10.6:8090/display/TGRID/Nightly%20Regression%2012589-74",
              "suspectedTests": 0,
              "timestamp": "2014-12-29T13:25:51.000Z",
              "totalTestsRun": 2178,
              "type": "tgrid"
            }
          ]
        }
      ];
      UnifiedDashboardCtrl = $controller('UnifiedDashboardCtrl', {
        $scope: scope
      });
    }))
  });

  describe('Controller tests', function() {

    it('should data be empty array', function () {
      expect(scope.data.length).toBe(0);
    });

    it('should have reload function', function () {
      expect(typeof(scope.reload)).toBe('function');
      scope.reload();
    });

    it('should have goTo function', function () {
      expect(typeof(scope.goTo)).toBe('function');
      scope.data = ['test'];
      scope.goTo('test');
      expect(scope.product).toBe('test');
    });

    it('should have hasNext function', function () {
      expect(typeof(scope.hasNext)).toBe('function');
      expect(scope.hasNext()).toBe(false);
    });

    it('should have hasPrev function', function () {
      expect(typeof(scope.hasPrev)).toBe('function');
      expect(scope.hasPrev()).toBe(false);
    });

    it('should have next function', function () {
      expect(typeof(scope.next)).toBe('function');
      scope.next();
    });

    it('should prev next function', function () {
      expect(typeof(scope.prev)).toBe('function');
      scope.prev();
    });

  });

});
