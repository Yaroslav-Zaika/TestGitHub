angular.module('app')
  .controller('repositoriesController', ['$location', '$rootScope', '$cookies', 'githubFactory', 'storageFactory', 'apiFactory', 'convertDateFactory', 'langColorFactoty', function ($location, $rootScope, $cookies, githubFactory, storageFactory, apiFactory, convertDateFactory, langColorFactoty){
    var self = this;
    
    self.init = function () {
      storageFactory.set('routerUrl', '/');
      var token = $cookies.get('token');
      
      if (token) {
        repos();
        user();
        
        // Hide the authorization directive
        self.authFlag = false;
      } else {
        // Show authorization directive
        self.authFlag = true;
      }
    };
    
    self.getColor = function (lang) {
      return langColorFactoty.getColor(lang);
    };
    
    // listener
    $rootScope.$on('token', self.init);
    
    // Get a list of repositories
    function repos () {
      var reposData = storageFactory.get('repositories'); 
      
      if (reposData) {
        self.repositories = reposData.data;
      } else {
        githubFactory.repos().then(function (r) {
          if(r.data) {
            angular.forEach(r.data, function (repo, index) {
              r.data[index].updated = convertDateFactory.convert('Updated ', repo.updated_at);
            });
            
            self.repositories = r.data;
            // repositories data saving        
            storageFactory.set('repositories', r);
          }
        }, function (e){
          self.authFlag = true;
        });
      }
    };
    
    // Get user data
    function user () {
      var userData = storageFactory.get('user');
      
      if (userData) {
        self.user = userData.data
        return userData.data;
      } else {
        githubFactory.user().then(function (r) {
          if (r.data) {
            self.user = r.data;
            // user data saving
            storageFactory.set('user', r);
          }
        }, function (e){
          self.authFlag = true;
        });
      }
      
      section(self.user);
    };
    
    // section saving
    function section (user) {
      if (user && user.login) {
        var url = $location.absUrl();
        apiFactory.section(self.userLogin, url);
      }
    };
  }]);