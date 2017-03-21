angular.module('app')
  .factory('githubFactory',['$http', '$location', '$cookies', 'storageFactory', function ($http, $location, $cookies, storageFactory) {
    var github = {
      path: 'https://api.github.com/',
      authUrl: 'https://github.com/login/oauth/authorize?client_id=af5742ba6954ff7fc27f&scope=public_repo'
    };
    
    // config
    github.config = function () {
      return {
        headers: {
          'Authorization': 'token ' + $cookies.get('token')
        }
      }
    };
    
    // Authorization URL
    github.authorize = function () {
      var routerUrl = storageFactory.get('routerUrl');
      return github.authUrl + '&redirect_uri=http://' + $location.host() + routerUrl;
    };
    
    // Requesting user information
    github.user = function () {
      return $http.get(github.path + 'user', github.config());
    };
    
    // Requesting information about repositories
    github.repos = function () {
      return $http.get(github.path + 'user/repos', github.config());
    };
    
    // Requesting information about problems with the repository
    github.issues = function (login, name) {
      return $http.get(github.path + 'repos/'+ login + '/' + name + '/issues?state=all', github.config());
    };
    
    return {
      authorize: github.authorize,
      user: github.user,
      repos: github.repos,
      issues: github.issues
    }
  }]);