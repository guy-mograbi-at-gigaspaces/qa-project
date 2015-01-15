'use strict';

describe('Controller: MetricCtrl', function () {

  var MetricCtrl, scope;

  // load the controller's module
  beforeEach(module('qaProjectApp'));

  describe('Test setup', function() {
    it('', inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      MetricCtrl = $controller('MetricCtrl', {
        $scope: scope
      });
    }))
  });

  describe('Controller tests', function() {

    it('should chartOpts to be object', function () {
      expect(typeof(scope.chartOpts)).toBe('object');
    });

    it('should zoomDataPrettyPrint to be function', function () {
      expect(typeof(scope.zoomDataPrettyPrint)).toBe('function');
    });

    it('should zoomDataPrettyPrint to have been called', function(){
      scope.zoomData = {};
      expect(scope.zoomDataPrettyPrint()).toBe('{}');
    });

    it('should chartItemClicked to have been called', function(){
      scope.slicedData = [{name: 'test'}];
      scope.chartItemClicked({
        item: {
          dataIndex: 0
        }
      });
      expect(scope.zoomData.name).toBe('test');
    });

    it('should optionKeys to have been called', function(){
      scope.options = [{name: 'test'}];
      expect(scope.optionKeys()).toContain(0);
    });

    it('should optionValues to have been called', function(){
      scope.options = [{name: 'test'}];
      expect(scope.optionValues(0).name).toContain('test');
    });

    it('should sliceData to be true', function(){
      scope.options = [];
      expect(scope.sliceData()).toBe(true);
    });

    it('should sliceData to be false', function(){
      scope.options = [{name: 'test'}];
      expect(scope.sliceData()).toBe(false);
    });

    it('should processDataForChart to have been called', function(){
      scope.optionsData = [{name: 'test'}];
      expect(scope.processDataForChart(scope.optionsData)).toBeUndefined();
    });

    it('should addSlice to have been called', function(){
      expect(scope.addSlice(2, 'test')).toBeUndefined();
    });

    it('should clearSlice to have been called', function(){
      expect(scope.clearSlice(2)).toBeUndefined();
    });

  });

});
