angular.module('app')
  .controller('authController', ['$rootScope', '$state', '$stateParams', '$location', '$cookies', 'storageFactory', 'githubFactory', 'apiFactory', function ($rootScope, $state, $stateParams, $location, $cookies, storageFactory, githubFactory, apiFactory) {
    var self = this;
    
    self.auntUrl = githubFactory.authorize();
    self.showFlag = true;
    var search = $location.search();
    var statusUser;
    
    if (search.code) {
      self.showFlag = false;
      // Get token
      apiFactory.signIn(search).then(function (r){
        if(r.data && r.data.access_token) {
          statusUser = 'connect';
          
          // token saving
          $cookies.put('token', r.data.access_token);
          
          // Generates an event
          $rootScope.$emit('token');
        } else {
          self.showFlag = true;
        }
      }, function (e){
        self.showFlag = true;
      }); 
    }
    
    // Get user data
    function user () {
      
      if ($location.url().search('/statistics') != -1){
        return false;
      }
      
      githubFactory.user().then(function (r) {
        if (r.data && r.data.login) {
          // user data saving
          storageFactory.set('user', r);
          status(r.data.login);
        }
      }, function (e){
        self.showFlag = true;
      });
    };
    
    // listener 
    $rootScope.$on('token', user);
    
    // status saving
    function status (login) {
      apiFactory.status(login, statusUser);
    };
  }]);