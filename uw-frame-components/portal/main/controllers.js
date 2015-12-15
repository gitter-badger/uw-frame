'use strict';

define(['angular','require'], function(angular, require) {
  var app = angular.module('portal.main.controllers', []);

  app.controller('PortalMainController', ['$localStorage', '$sessionStorage','$scope', '$rootScope', '$document', '$location', 'NAMES', 'MISC_URLS', 'APP_FLAGS','THEMES','miscService', function($localStorage, $sessionStorage, $scope, $rootScope, $document, $location, NAMES, MISC_URLS, APP_FLAGS,THEMES, miscService) {
    var defaults = {
            showKeywordsInMarketplace : false,
            homeImg : "img/square.jpg",
            profileImg: "img/terrace.jpg",
            typeaheadSearch: false,
            exampleWidgets: false,
            layoutMode : 'list', //other option is 'widgets'
            gravatarEmail : null,
            useGravatar : false,
            webPortletRender : false,
            lastSeenFeature : -1
            };


    //=====functions ======
    var init = function(){
      $scope.$storage = $localStorage.$default(defaults);

      $scope.NAMES=NAMES;
      $scope.classicURL=MISC_URLS.back2ClassicURL;
      $scope.APP_FLAGS=APP_FLAGS;
      $scope.MISC_URLS=MISC_URLS;
      $scope.THEMES = THEMES;

      if(NAMES.title) {
        $document[0].title=NAMES.title;
      }

      //class for ng-view
      $scope.routeClass = "route" + angular.lowercase($location.path().replace(new RegExp('/', 'g'), '-'));
    }

    $scope.resetLocal = function() {
        $localStorage.$reset(defaults);
    };

    $scope.clearSession = function() {
        $sessionStorage.$reset();
    };

    $scope.reload = function() {
        location.reload();
    }
    $scope.pushGAEvent = function (category, action, label) {
      miscService.pushGAEvent(category, action, label);
    }

    //run init
    init();
  } ]);

  /* Username */
  app.controller('SessionCheckController', [ '$scope', 'mainService', 'NAMES', 'FOOTER_URLS', '$rootScope', function($scope, mainService, NAMES, FOOTER_URLS, $rootScope) {
    var that = this;
    that.user = [];
    
    $scope.FOOTER_URLS = FOOTER_URLS;

    //initialize GuestMode
    $rootScope.GuestMode = false;
    mainService.getUser().then(function(result){
      that.user = result;
      //check if is guest
      if (NAMES.guestUserName && that.user && that.user.userName === NAMES.guestUserName)
        $rootScope.GuestMode = true;

    });
  }]);

  /* Header */
  app.controller('PortalHeaderController', ['$rootScope', '$scope','$location', 'NAMES', 'APP_FLAGS', 'MISC_URLS', function($rootScope, $scope, $location, NAMES, APP_FLAGS, MISC_URLS) {
    this.navbarCollapsed = true;
    this.showLogout = true;
    $scope.showSearch = false;
    $scope.showSearchFocus = false;
    $scope.APP_FLAGS = APP_FLAGS;
    $scope.MISC_URLS = MISC_URLS;

    this.toggleSearch = function() {
        $scope.showSearch = !$scope.showSearch;
        $scope.showSearchFocus = !$scope.showSearchFocus;
    }
  }]);

  /* Footer */
  app.controller('PortalFooterController', ['$scope', function($scope) {
      $scope.date = new Date();

  }]);

  return app;

});
