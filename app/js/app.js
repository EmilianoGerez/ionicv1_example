// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'App' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('App', ['ionic', 'ngCordova', 'ngAnimate'])

.run(['$ionicPlatform',
    '$sqliteService', '$rootScope', '$location', '$authService',
    function($ionicPlatform, $sqliteService, $rootScope, $location, $authService) {
      $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

          // Don't remove this line unless you know what you are doing. It stops the viewport
          // from snapping when text inputs are focused. Ionic handles this internally for
          // a much nicer keyboard experience.
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }

        //Load the Pre-populated database, debug = true
        $sqliteService.preloadDataBase(true);
      });


      // check is login
      $rootScope.$on('$stateChangeStart', function(e) {
        if (!$authService.getCurrentUser()) {
          console.log($authService.getCurrentUser());
          $location.path('/login');
        }
      });
    }
  ])
  .config(['$stateProvider',
    '$urlRouterProvider',
    '$ionicConfigProvider',
    '$compileProvider',
    function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {

      $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content|ms-appx|x-wmapp0):|data:image\/|img\//);
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);

      $ionicConfigProvider.scrolling.jsScrolling(ionic.Platform.isIOS());

      $stateProvider
        .state('public', {
          url: '',
          abstract: true,
          views: {
            'app': {
              templateUrl: 'templates/public.layout.html'
            }
          },
          data: {
            requiresLogin: false
          }
        })
        .state('private', {
          url: '',
          abstract: true,
          views: {
            'app': {
              templateUrl: 'templates/private.layout.html'
            }
          },
          data: {
            requiresLogin: true
          }
        })
        .state('public.login', {
          url: "/login",
          views: {
            'content@public': {
              templateUrl: "templates/login.html",
              controller: 'AuthCtrl'
            }
          }

        })
        .state('public.home', {
          url: "/home",
          views: {
            'content@public': {
              templateUrl: "templates/home.html",
              controller: 'HomeController'
            }
          }
        })
        .state('app', {
          url: '/app',
          abstract: true,
          views: {
            'content@private': {
              controller: 'AppController',
              templateUrl: 'templates/menu.html'
            }
          }
        })
        .state('private.dashboard', {
          url: "/dashboard",
          cache: false,
          views: {
            'content@private': {
              templateUrl: "templates/dashboard.view.html",
              controller: 'DashboardCtrl'
            }
          }
        });

      $urlRouterProvider.otherwise(function($injector, $location) {
        var $state = $injector.get("$state");
        $state.go("private.dashboard");
      });
    }
  ]);