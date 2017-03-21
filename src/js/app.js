angular.module('app', ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngCookies'])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
      
      $stateProvider
        .state('repositories', {
          url: '/',
          templateUrl: 'templates/repositories.html',
          controller: 'repositoriesController',
          controllerAs: 'repositoriesCtrl'
        })
        .state('issues', {
          url: '/{login}/{name}/issues',
          templateUrl: 'templates/issues.html',
          controller: 'issuesController',
          controllerAs: 'issuesCtrl'
        })
        .state('statistics', {
          url: '/statistics',
          templateUrl: 'templates/statistics.html',
          controller: 'statisticsController',
          controllerAs: 'statisticsCtrl'
        });

      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true); 
    }]);