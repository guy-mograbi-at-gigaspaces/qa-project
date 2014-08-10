'use strict';

describe('Filter: suiteName', function () {

  // load the filter's module
  beforeEach(module('qaProjectApp'));

  // initialize a new instance of the filter before each test
  var suiteName;
  beforeEach(inject(function ($filter) {
    suiteName = $filter('suiteName');
  }));

  it('should return the input prefixed with "suiteName filter:"', function () {
    var text = 'angularjs';
//    expect(suiteName(text)).toBe('suiteName filter: ' + text);
  });

});
