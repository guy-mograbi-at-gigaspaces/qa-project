'use strict';

describe('Controller: SprintCtrl', function () {

  var SprintCtrl, scope;

  // load the controller's module
  beforeEach(module('qaProjectApp'));

  describe('Test setup', function() {
    it('', inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      SprintCtrl = $controller('SprintCtrl', {
        $scope: scope
      });
    }))
  });

  describe('Controller tests', function() {
    //it('', function () {
    //  expect().toBe('');
    //});
  });

});
