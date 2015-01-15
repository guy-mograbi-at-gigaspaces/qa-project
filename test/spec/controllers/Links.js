'use strict';

describe('Controller: LinksCtrl', function () {

  var LinksCtrl, scope;

  // load the controller's module
  beforeEach(module('qaProjectApp'));

  describe('Test setup', function() {
    it('', inject(function ($controller, $rootScope, $httpBackend) {
      $httpBackend.whenPOST('/backend/links/suggest').respond(200);

      scope = $rootScope.$new();
      LinksCtrl = $controller('LinksCtrl', {
        $scope: scope
      });
    }))
  });

  describe('Controller tests', function() {

    it('should page items length to be six', function () {
      expect(scope.page.items.length).toBe(6);
    });

    it('should submitSuggestion to be function', function () {
      expect(typeof(scope.submitSuggestion)).toBe('function');
    });

    beforeEach(function(){
      spyOn(scope, 'submitSuggestion');
      scope.submitSuggestion();
    });

    it('should submitSuggestion to have been call', function () {
      expect(scope.submitSuggestion).toHaveBeenCalled();
    });

  });

});
