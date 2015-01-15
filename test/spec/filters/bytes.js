'use strict';

describe('Filter: bytes', function () {

  // initialize a new instance of the filter before each test
  var bytes;

  describe('Test setup', function() {
    it('Injecting required data & initializing a new instance', function() {
      // load the filter's module
      module('qaProjectApp');

      // initialize a new instance of the filter
      inject(function ($filter) {
        bytes = $filter('bytes');
      });
    });
  });

  describe('Unit tests', function() {

    it('has a bytes filter', function(){
      expect(bytes).not.toBeUndefined();
    });

    it('should convert bytes to kB', function() {
      expect(bytes(1024)).toBe('1.0 kB');
    });

    it('should convert bytes to MB', function() {
      expect(bytes(1124000)).toBe('1.1 MB');
    });

    it('should return empty result for NaN value', function() {
      expect(bytes('test')).toBe('-');
    });

  });

});
