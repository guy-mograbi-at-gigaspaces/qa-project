'use strict';

describe('Filter: sprint', function () {

  // load the filter's module
  beforeEach(module('qaProjectApp'));

  // initialize a new instance of the filter before each test
  var sprint;
  beforeEach(inject(function ($filter) {
    sprint = $filter('sprint');
  }));

  it('should return the input prefixed with "sprint filter:"', function () {
    var text = 'angularjs';
//    expect(sprint(text)).toBe('sprint filter: ' + text);
  });

});
