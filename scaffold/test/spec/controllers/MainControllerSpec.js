describe('Controller: MainController', function () {
  'use strict';
  var scope,
      ctrl;

  // load the controller's module
  beforeEach(module('MainController'));

  // Initialize the controller and a mock scope
  beforeEach(function () {

    module(function($provide) {

    });

    inject(function ($controller, $injector, $rootScope) {
      scope = $rootScope.$new();
      window = $injector.get('$window');
      ctrl = $controller('MainController', {$scope:scope});
    });
  });

  describe('on initialization', function () {
    it('trig_is should be set to "Mathematical!"', function () {
      expect(scope.trig_is).toBe("Mathematical!");
    });

  });


});
