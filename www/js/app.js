// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('segmentfault', ['ionic', 'ngResource'])

.constant('API_HOST', 'http://www.codemoment.com/api/proxy')
    .run([
        '$ionicPlatform',
        run
    ])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$ionicConfigProvider',
        '$httpProvider',
        config
    ])

function run($ionicPlatform) {

    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
}

function config($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.tabs.style('standard');

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.QA', {
            url: '/QA',
            views: {
                'tab-QA': {
                    templateUrl: 'templates/tab-QA.html',
                    controller: 'QuestionCtrl'
                }
            }
        })
        .state('tab.QA-detail', {
            url: '/QA/:id',
            views: {
                'tab-QA': {
                    templateUrl: 'templates/QA-detail.html',
                    controller: 'QuestionDetailCtrl'
                }
            }
        })
        .state('tab.article', {
            url: '/article',
            views: {
                'tab-article': {
                    templateUrl: 'templates/tab-article.html',
                    controller: 'ChatsCtrl'
                }
            }
        })

    .state('tab.article-detail', {
            url: '/article/:chatId',
            views: {
                'tab-article': {
                    templateUrl: 'templates/article-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        })
        .state('tab.favorite', {
            url: '/favorite',
            views: {
                'tab-favorite': {
                    templateUrl: 'templates/tab-favorite.html',
                    controller: 'ChatsCtrl'
                }
            }
        })
        .state('tab.settings', {
            url: '/settings',
            views: {
                'tab-settings': {
                    templateUrl: 'templates/tab-settings.html',
                    controller: 'AccountCtrl'
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/QA');

}