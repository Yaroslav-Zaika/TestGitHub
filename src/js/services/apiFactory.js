angular.module('app')
  .factory('apiFactory',['$http', 'storageFactory', function ($http, storageFactory) {
    var api = {};
    
    // Sending data for authorization
    api.signIn = function (code) {
      return $http.post('api/signin', code);
    };
    
    // Sending status information
    api.status = function (login, status_user) {
      return $http.post('api/stats/status', { login: login, status: status_user });
    };
    
    // Sending information about a section
    api.section = function (login, url) {
      return $http.post('api/stats/section', { login: login, url: url });
    };
    
    // Get statistics
    api.getUserStatistics = function (login) {
      return $http.get('api/stats/' + login);
    };
    
    return {
      signIn: api.signIn,
      status: api.status,
      section: api.section,
      getUserStatistics: api.getUserStatistics,
    }
  }]);