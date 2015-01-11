'use strict';

describe('Controller: ReportCtrl', function () {

  var ReportCtrl, scope;

  // load the controller's module
  beforeEach(module('qaProjectApp'));

  describe('Test setup', function() {
    it('', inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      ReportCtrl = $controller('ReportCtrl', {
        $scope: scope
      });
    }))
  });

  describe('Controller tests', function() {

    it('should showReportDetails to be a function', function () {
      expect(typeof(scope.showReportDetails)).toBe('function');
    });

    it('should showReportDetails to have been called', function () {
      scope.showReportDetails('test');
      expect(scope.reportDetails).toBe('test');
    });

  });

});
