'use strict';

describe('Service: MetricService', function () {

  // load the service's module
  beforeEach(module('qaProjectApp'));

  // instantiate service
  var MetricService;
  beforeEach(inject(function (_MetricService_) {
    MetricService = _MetricService_;
  }));

  it('should do something', function () {
//    expect(!!MetricService).toBe(true);
  });

});
