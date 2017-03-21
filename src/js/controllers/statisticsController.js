angular.module('app')
  .controller('statisticsController', ['$rootScope', '$cookies', 'githubFactory', 'storageFactory', 'apiFactory', function ($rootScope, $cookies, githubFactory, storageFactory, apiFactory) {
    
    var self = this;
    
    self.init = function () {
      storageFactory.set('routerUrl', '/statistics');
      var token = $cookies.get('token');
      
      if (token) {
        getUserStatistics();
        
        // Hide the authorization directive
        self.authFlag = false;
      } else {
        // Show authorization directive
        self.authFlag = true;
      }
    };
    
    // listener
    $rootScope.$on('token', this.init);
    
    // Get statistics
    function getUserStatistics () {
      
      // Get user data
      var user = githubFactory.user().then(function (r) {
        return r.data
      });
      
      // Get statistics about user activity  
      user.then(function (user) {
        if (user && user.login) {
          apiFactory.getUserStatistics(user.login).then(function (r) {
            if (r.data && r.data.statistics === 'not found') {
              self.noStats = true;
            } else {
              self.noStats = false;
              self.userStats = r.data;
            }
          });
        }
      });
    };
  }]);