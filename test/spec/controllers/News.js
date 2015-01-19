'use strict';

describe('Controller: NewsCtrl', function () {

  var NewsCtrl, scope;

  // load the controller's module
  beforeEach(module('qaProjectApp'));

  describe('Test setup', function() {
    it('', inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      scope.newsItems = [{item: 'test'}];
      NewsCtrl = $controller('NewsCtrl', {
        $scope: scope
      });
    }))
  });

  describe('Controller tests', function() {

    it('should updateInterval to be 3000', function () {
      expect(scope.updateInterval).toBe(3000);
    });

  });

});
