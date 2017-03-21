angular.module('app')
  .directive('auth', function () {
    return {
      restrict: 'A',
      templateUrl: 'templates/auth.html',
      controller: 'authController',
      controllerAs: 'authCtrl'
    }
  });