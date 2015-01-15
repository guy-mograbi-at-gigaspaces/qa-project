'use strict';

describe('Filter: sprint', function () {

  // initialize a new instance of the filter before each test
  var sprint,
      data = [
        {statusId: '1', label: 'to do'},
        {statusId: '3', label: 'in-progress'},
        {statusId: '5', label: 'resolved'}
      ];

  describe('Test setup', function() {
    it('Injecting required data & initializing a new instance', function() {
      // load the filter's module
      module('qaProjectApp');

      // initialize a new instance of the filter
      inject(function ($filter) {
        sprint = $filter('sprint');
      });
    });
  });

  describe('Unit tests', function() {

    it('has a sprint filter', function(){
      expect(sprint).not.toBeUndefined();
    });

    it('should return false', function() {
      expect(sprint(false, 'to do')).toBe(false);
    });

    it('should return to do label', function() {
      expect(sprint({incompletedIssues: data}, 'to do')[0].label).toBe('to do');
    });

    it('should return in-progress label', function() {
      expect(sprint({incompletedIssues: data}, 'in-progress')[0].label).toBe('in-progress');
    });

    it('should return resolved label', function() {
      expect(sprint({incompletedIssues: data}, 'resolved')[0].label).toBe('resolved');
    });

    it('should return closed label', function() {
      expect(sprint({completedIssues: 'closed'}, 'closed')).toBe('closed');
    });

  });

});
