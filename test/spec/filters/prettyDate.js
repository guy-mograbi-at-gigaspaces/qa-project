'use strict';

describe('Filter: prettyDate', function () {

  // load the filter's module
  beforeEach(module('qaProjectApp'));

  // initialize a new instance of the filter before each test
  var prettyDate;
  beforeEach(inject(function ($filter) {
    prettyDate = $filter('prettyDate');
  }));

  it('should return the input prefixed with "prettyDate filter:"', function () {
    var text = 'angularjs';
//    expect(prettyDate(text)).toBe('prettyDate filter: ' + text);
  });

});
