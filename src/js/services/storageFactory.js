angular.module('app')
  .factory('storageFactory', function () {
    var storage = {};
    
    // Set params
    storage.set = function (name, params) {
      storage[name] = params;
    };
    
    // Get params
    storage.get = function (name) {
      return storage[name];
    };

    return {
      set: storage.set,
      get: storage.get
    }
  });