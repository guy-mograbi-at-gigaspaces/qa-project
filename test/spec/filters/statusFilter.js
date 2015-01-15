'use strict';

describe('Filter: statusFilter', function () {

  // initialize a new instance of the filter before each test
  var statusFilter;

  describe('Test setup', function() {
    it('Injecting required data & initializing a new instance', function() {
      // load the filter's module
      module('qaProjectApp');

      // initialize a new instance of the filter
      inject(function ($filter) {
        statusFilter = $filter('statusFilter');
      });
    });
  });

  describe('Unit tests', function() {

    it('has a statusFilter filter', function(){
      expect(statusFilter).not.toBeUndefined();
    });

    it('has a statusFilter filter', function(){
      expect(statusFilter([], 'FAILED').length).toBe(0);
    });

  });

});
