'use strict';

define(['angular', 'require'], function(angular, require) {
  var app = angular.module('portal.settings.directives', []);
  
  app.directive('settingOption', function(){
    return {
        restrict : 'E',
        templateUrl : require.toUrl('./partials/setting-option.html')
    }
  });
  
  return app;

});