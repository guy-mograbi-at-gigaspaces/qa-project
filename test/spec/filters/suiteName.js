'use strict';

describe('Filter: suiteName', function () {

  // initialize a new instance of the filter before each test
  var suiteName;

  describe('Test setup', function() {
    it('Injecting required data & initializing a new instance', function() {
      // load the filter's module
      module('qaProjectApp');

      // initialize a new instance of the filter
      inject(function ($filter) {
        suiteName = $filter('suiteName');
      });
    });
  });

  describe('Unit tests', function() {

    it('has a suiteName filter', function(){
      expect(suiteName).not.toBeUndefined();
    });

  });

});
