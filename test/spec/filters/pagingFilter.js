'use strict';

describe('Filter: pagingFilter', function () {

  // initialize a new instance of the filter before each test
  var pagingFilter;

  describe('Test setup', function() {
    it('Injecting required data & initializing a new instance', function() {
      // load the filter's module
      module('qaProjectApp');

      // initialize a new instance of the filter
      inject(function ($filter) {
        pagingFilter = $filter('pagingFilter');
      });
    });
  });

  describe('Unit tests', function() {

    it('has a pagingFilter filter', function(){
      expect(pagingFilter).not.toBeUndefined();
    });

    it('should return slice for page one', function() {
      expect(pagingFilter([1,2,3,4], 1, 2)).toContain(3);
      expect(pagingFilter([1,2,3,4], 1, 2)).toContain(4);
    });

  });

});
