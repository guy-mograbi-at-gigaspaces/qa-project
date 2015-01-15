'use strict';

describe('Controller: SearchCtrl', function () {

  var SearchCtrl, scope;

  // load the controller's module
  beforeEach(module('qaProjectApp'));

  describe('Test setup', function() {
    it('', inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      SearchCtrl = $controller('SearchCtrl', {
        $scope: scope
      });
    }))
  });

  describe('Controller tests', function() {

    it('should toggleHeader to be a function', function () {
      expect(typeof(scope.toggleHeader)).toBe('function');
    });

    it('should toggleHeader to remove suiteName', function () {
      scope.toggleHeader('suiteName');
      expect(scope.headers).toContain('buildVersion');
      expect(scope.headers).not.toContain('suiteName');
    });

    it('should toggleHeader to add testUnit', function () {
      scope.toggleHeader('testUnit');
      expect(scope.headers).toContain('testUnit');
    });

  });

});
