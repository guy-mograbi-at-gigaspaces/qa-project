'use strict';

describe('Filter: prettyDate', function () {

  // initialize a new instance of the filter before each test
  var prettyDate;

  describe('Test setup', function() {
    it('Injecting required data & initializing a new instance', function() {
      // load the filter's module
      module('qaProjectApp');

      // initialize a new instance of the filter
      inject(function ($filter) {
        prettyDate = $filter('prettyDate');
      });

      Date.prototype.removeMinutes = function (h) {
        this.setTime(this.getTime() - (h*60*1000));
        return this;
      }

      Date.prototype.removeHours = function (h) {
        this.setTime(this.getTime() - (h*60*60*1000));
        return this;
      }

      Date.prototype.removeDays = function (h) {
        this.setTime(this.getTime() - (h*60*60*24*1000));
        return this;
      }

      Date.prototype.removeWeeks = function (h) {
        this.setTime(this.getTime() - (h*60*60*24*7*1000));
        return this;
      }
    });
  });

  describe('Unit tests', function() {

    it('has a prettyDate filter', function(){
      expect(prettyDate).not.toBeUndefined();
    });

    it('should return just now time', function() {
      expect(prettyDate(new Date())).toBe('just now');
    });

    it('should return one minute ago', function() {
      expect(prettyDate(new Date().removeMinutes(1))).toBe('1 minute ago');
    });

    it('should return three minute ago', function() {
      expect(prettyDate(new Date().removeMinutes(3))).toBe('3 minutes ago');
    });

    it('should return one hours ago time', function() {
      expect(prettyDate(new Date().removeHours(1))).toBe('1 hour ago');
    });

    it('should return two hours ago time', function() {
      expect(prettyDate(new Date().removeHours(2))).toBe('2 hours ago');
    });

    it('should return yesterday time', function() {
      expect(prettyDate(new Date().removeDays(1))).toBe('Yesterday');
    });

    it('should return three days ago time', function() {
      expect(prettyDate(new Date().removeDays(3))).toBe('3 days ago');
    });

    it('should return 2 weeks ago time', function() {
      expect(prettyDate(new Date().removeWeeks(3))).toBe('3 weeks ago');
    });

    it('should return 2 weeks ago time', function() {
      expect(prettyDate(new Date().removeWeeks(5))).toBeUndefined();
    });

  });

});
