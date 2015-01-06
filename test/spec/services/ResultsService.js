'use strict';

describe('Service: ResultsService', function () {

  // instantiate service
  var ResultsService;

  describe('Test setup', function () {
    it('Injecting required data & initializing a new instance', function () {

      // load the service's module
      module('qaProjectApp');

      // Initialize a new instance of ResultsService
      inject(function (_ResultsService_) {
        ResultsService = _ResultsService_;
      });

    });
  });

  describe('Unit tests', function () {

    it('should create a new ResultsService instance', function () {
      expect(!!ResultsService).toBe(true);
    });

  });

});
