'use strict';

describe('Controller: RepositoryCtrl', function () {

  var RepositoryCtrl, scope;

  // load the controller's module
  beforeEach(module('qaProjectApp'));

  describe('Test setup', function() {
    it('', inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      RepositoryCtrl = $controller('RepositoryCtrl', {
        $scope: scope
      });
    }))
  });

  describe('Controller tests', function() {

    it('should type to be releases', function () {
      expect(scope.type).toBe('releases');
    });

    it('should getEntries to be a function', function () {
      expect(typeof(scope.getEntries)).toBe('function');
    });

    it('should getEntryName to be a function', function () {
      expect(typeof(scope.getEntryName)).toBe('function');
    });

    it('should return empty result from getEntries', function(){
      expect(scope.getEntries().length).toBe(0);
    });

    it('should remove "test" from the end of string', function(){
      expect(scope.getEntryName({key: 'test/'})).toBe('/');
    });

  });
});
