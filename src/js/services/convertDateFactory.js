angular.module('app')
  .factory('convertDateFactory', function () {
    var options = {
      prefix: '',
      suffix: ' ago',
      monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    };
    
    // convert date 
    options.convert = function (prefix, date) {
      options.prefix = prefix;
      var time = new Date(date);
      var monthUpdated = options.monthNamesShort[time.getMonth()];
      var seconds = Math.floor((new Date() - time.getTime()) / 1000);
      
      var interval = Math.floor(seconds / 31536000);
      
      if (interval > 1) {
        return options.prefix + 'on ' + time.getDate() + ' ' + monthUpdated + ' ' + time.getFullYear();
      }
      
      interval = Math.floor(seconds  / 2592000);
      if (interval > 1) {
        if (time.getFullYear() === new Date().getFullYear()) {
          return options.prefix + 'on ' + time.getDate() + ' ' + monthUpdated;
        } else {
          return options.prefix + 'on ' + time.getDate() + ' ' + monthUpdated + ' ' + time.getFullYear();
        }
      }

      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return options.prefix + interval + ' days' + options.suffix;
      } else if (interval === 1) {
        return options.prefix + 'a day' + options.suffix;
      }

      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return options.prefix + interval + ' hours' + options.suffix;
      } else if (interval === 1) {
        return options.prefix + interval + 'an hour' + options.suffix;
      }

      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return options.prefix + interval + ' minutes' + options.suffix;
      } else if (interval === 1) {
        return options.prefix + ' a minute' + options.suffix;
      }
      
      return options.prefix + Math.floor(seconds) + ' seconds' + options.suffix;
    };
  
    return {
      convert: options.convert
    }
  });