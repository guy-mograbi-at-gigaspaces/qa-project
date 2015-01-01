'use strict';

describe('Service: MetricService', function () {

  // instantiate service
  var MetricService;

  describe('Test setup', function () {
    it('Injecting required data & initializing a new instance', function () {

      // load the service's module
      module('qaProjectApp');

      // Initialize a new instance of MetricService
      inject(function (_MetricService_) {
        MetricService = _MetricService_;
      });

    });
  });

  describe('Unit tests', function () {

    it('should create a new MetricService instance', function () {
      expect(!!MetricService).toBe(true);
    });

    it('should have "getCombinations" method', function () {
      expect(MetricService.getCombinations).not.toBeUndefined();
    });

    beforeEach(function () {
      spyOn(MetricService, 'getCombinations');
      MetricService.getCombinations();
    });

    it('should call "getCombinations" method', function () {
      expect(MetricService.getCombinations).toHaveBeenCalled();
    });

    it('should have "getSlicedData" method', function () {
      expect(MetricService.getSlicedData).not.toBeUndefined();
    });

    beforeEach(function () {
      spyOn(MetricService, 'getSlicedData');
      MetricService.getSlicedData();
    });

    it('should call "getSlicedData" method', function () {
      expect(MetricService.getSlicedData).toHaveBeenCalled();
    });

  });

});
