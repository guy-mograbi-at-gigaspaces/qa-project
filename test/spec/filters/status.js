'use strict';

describe('Filter: status', function () {

  // initialize a new instance of the filter before each test
  var status;

  describe('Test setup', function() {
    it('Injecting required data & initializing a new instance', function() {
      // load the filter's module
      module('qaProjectApp');

      // initialize a new instance of the filter
      inject(function ($filter) {
        status = $filter('status');
      });
    });
  });

  describe('Unit tests', function() {

    it('has a status filter', function(){
      expect(status).not.toBeUndefined();
    });

  });

});
