angular.module('app')
  .factory('langColorFactoty', function () {
    var obj = {};
    
    // Get color
    obj.getColor = function (lang) {
      if (lang){
        var color;
        
        switch (lang) {
          case 'Java':
            color = '#b07219';
            break;
          case 'JavaScript':
            color = '#f1e05a';
            break;
          case 'Ruby':
            color = '#701516';
            break;
          case 'PHP':
            color = '#4F5D95';
            break;
          case 'HTML':
            color = '#e34c26';
            break;
          case 'Python':
            color = '#3572A5';
            break;
          case 'C#':
            color = '#178600';
            break;
          case 'C++':
            color = '#f34b7d';
            break;
          case 'CSS':
            color = '#563d7c';
            break;
          case 'C':
            color = '#555555';
            break;
          default: 
            color = '#4c9668'
        }
        
        return color;
      }
    };
    
    return {
      getColor: obj.getColor
    }
  });