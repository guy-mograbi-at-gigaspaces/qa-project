'use strict';

describe('Directive: smartTable', function () {

  var element, scope;

  beforeEach(module('qaProjectApp'));

  describe('Test setup', function() {
    it('should create directive element', inject(function($rootScope, $compile){
      scope = $rootScope.$new();
      element = $compile(angular.element('<div smart-table></div>'))(scope);

      $rootScope.$apply();

      scope = element.isolateScope();
      scope.$apply();
    }));
  });

  describe('Directive tests', function() {

    it('should create scope object', function() {
      expect(scope).not.toBeUndefined();
    });

    it('should create an element with orderTableBy function', function() {
      expect(typeof(scope.orderTableBy)).toBe('function');
    });

  });

});
