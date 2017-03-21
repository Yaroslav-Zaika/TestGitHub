angular.module('app')
  .controller('issuesController', ['$rootScope', '$state', '$location', '$cookies', 'storageFactory', 'githubFactory', 'apiFactory', 'convertDateFactory', function ($rootScope, $state, $location, $cookies, storageFactory, githubFactory, apiFactory, convertDateFactory) {
    var self = this;
    
    self.userLogin = $state.params.login;
    self.repoName = $state.params.name;
    
    this.init = function () {
      storageFactory.set('routerUrl', '/' + self.userLogin + '/' + self.repoName + '/issues');
      var token = $cookies.get('token');
      
      if (token) {
        issues();
        section();
        
        // Hide the authorization directive
        self.authFlag = false;
      } else {
        // Show authorization directive
        self.authFlag = true;
      }
    };
    
    // Listener
    $rootScope.$on('token', this.init);
    
    // Get issues data
    function issues () {
      if (self.userLogin && self.repoName) {
        githubFactory.issues(self.userLogin, self.repoName).then(function (r) {
          if (r.data.length) {
            angular.forEach(r.data, function (issue, index) {
              r.data[index].opened = convertDateFactory.convert('opened ', issue.created_at);
            });
            self.issues = r.data;
          } else {
            self.noQuestions = true;
          }
        }, function (e) {
          self.authFlag = true;
        });
      }
    };
    
    // Section saving
    function section () {
      if (self.userLogin) {
        var url = $location.absUrl();
        apiFactory.section(self.userLogin, url);
      }
    };
  }]);