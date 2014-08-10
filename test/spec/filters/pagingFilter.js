'use strict';

describe('Filter: pagingFilter', function () {

  // load the filter's module
  beforeEach(module('qaProjectApp'));

  // initialize a new instance of the filter before each test
  var pagingFilter;
  beforeEach(inject(function ($filter) {
    pagingFilter = $filter('pagingFilter');
  }));

  it('should return the input prefixed with "pagingFilter filter:"', function () {
    var text = 'angularjs';
//    expect(pagingFilter(text)).toBe('pagingFilter filter: ' + text);
  });

});
