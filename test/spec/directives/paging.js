'use strict';

describe('Directive: paging', function () {

  var element, scope;

  beforeEach(module('qaProjectApp'));

  describe('Test setup', function() {
    it('should create directive element', inject(function($rootScope, $compile){
      scope = $rootScope.$new();
      scope.data = [{page: 1}, {page: 2}];
      scope.resultPage = 0;
      scope.resultPageSize = 1;
      element = $compile(angular.element('<paging data="data" current-page="resultPage" page-size="resultPageSize"></paging>'))(scope);

      $rootScope.$apply();

      scope = element.isolateScope();
      scope.$apply();
    }));
  });

  describe('Directive tests', function() {

    it('should have working onNext function', function() {
      expect(scope.onNext()).toBeUndefined();
      expect(scope.currentPage).toBe(1);
    });

    it('should have working onPrev function', function() {
      expect(scope.onPrev()).toBeUndefined();
      expect(scope.currentPage).toBe(0);
    });

  });
});
