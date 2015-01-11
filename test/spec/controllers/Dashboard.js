'use strict';

describe('Controller: DashboardCtrl', function () {

  var DashboardCtrl, scope;

  // load the controller's module
  beforeEach(module('qaProjectApp'));

  describe('Test setup', function() {
    it('', inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      DashboardCtrl = $controller('DashboardCtrl', {
        $scope: scope
      });
    }))
  });

  describe('Controller tests', function() {

    it('should expand test to be null', function () {
      expect(scope.expand.test).toBe(null);
    });

    it('should getItemsByState to be function', function () {
      expect(typeof(scope.getItemsByState)).toBe('function');
    });

    it('should getItemsByState return empty object', function () {
      expect(scope.getItemsByState(undefined, 'state').length).toBe(0);
    });

    it('should getItemsByState return object', function () {
      expect(typeof(scope.getItemsByState([], 'state'))).toBe('object');
    });

  });

});
