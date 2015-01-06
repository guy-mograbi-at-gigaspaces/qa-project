'use strict';

describe('Service: SprintService', function () {

  // instantiate service
  var SprintService;

  describe('Test setup', function () {
    it('Injecting required data & initializing a new instance', function () {

      // load the service's module
      module('qaProjectApp');

      // Initialize a new instance of SprintService
      inject(function (_SprintService_) {
        SprintService = _SprintService_;
      });

    });
  });

  describe('Unit tests', function () {

    it('should create a new SprintService instance', function () {
      expect(!!SprintService).toBe(true);
    });

  });

});
