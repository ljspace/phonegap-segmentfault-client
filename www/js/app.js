angular.module('segmentfault', [
        'ngCordova',
        'ionic',
        'ngResource'
    ])
    .constant('API_HOST', 'http://www.codemoment.com/api/proxy')
    .run([
        '$rootScope',
        '$ionicPlatform',
        '$cordovaNetwork',
        '$cordovaDialogs',
        'AnalyticsService',
        run
    ])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$ionicConfigProvider',
        '$httpProvider',
        config
    ])

function run($rootScope, $ionicPlatform, $cordovaNetwork, $cordovaDialogs, AnalyticsService) {

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

        $rootScope.network = $cordovaNetwork.getNetwork();

        if ($rootScope.network === 'none') {
            $cordovaDialogs.alert('网络异常，请检查网络连接！', '提示', '确认');
        }

        $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
            $rootScope.network = networkState;
        });

        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
            $rootScope.network = networkState;
        });

        AnalyticsService.init();
    });
}

function config($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.tabs.style('standard');

    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function(code, lang) {
            if (lang) {
                return hljs.highlight(lang, code).value;
            } else {
                return hljs.highlightAuto(code).value;
            }
        },
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    });

    $stateProvider
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })
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
                    controller: 'ArticleCtrl'
                }
            }
        })
        .state('tab.article-detail', {
            url: '/article/:id',
            views: {
                'tab-article': {
                    templateUrl: 'templates/article-detail.html',
                    controller: 'ArticleDetailCtrl'
                }
            }
        })
        .state('tab.about', {
            url: '/about',
            views: {
                'tab-about': {
                    templateUrl: 'templates/tab-about.html'
                }
            }
        });

    $urlRouterProvider.otherwise('/tab/QA');
}