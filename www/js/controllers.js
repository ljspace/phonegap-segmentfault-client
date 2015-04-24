angular.module('segmentfault')
    .controller('TabCtrl', [
        '$rootScope',
        '$scope',
        'AnalyticsService',
        tabCtrl
    ])
    .controller('QuestionCtrl', [
        '$rootScope',
        '$scope',
        '$ionicLoading',
        'QuestionFactory',
        questionCtrl
    ])
    .controller('QuestionDetailCtrl', [
        '$scope',
        '$stateParams',
        '$ionicLoading',
        'QuestionDetailFactory',
        'QuestionAnswerFactory',
        '$cordovaInAppBrowser',
        questionDetailCtrl
    ])
    .controller('ArticleCtrl', [
        '$rootScope',
        '$scope',
        '$ionicLoading',
        'ArticleFactory',
        articleCtrl
    ])
    .controller('ArticleDetailCtrl', [
        '$scope',
        '$stateParams',
        '$ionicLoading',
        'ArticleDetailFactory',
        '$cordovaInAppBrowser',
        articleDetailCtrl
    ]);

function tabCtrl($rootScope, $scope, AnalyticsService) {

    $scope.onTabSelected = function(page) {
        AnalyticsService.viewStart(page);
    }

    $scope.onTabDeselected = function(page) {
        AnalyticsService.viewEnd(page);
    }

    $scope.doRefresh = function() {

        $rootScope.$broadcast('refreshData');
        AnalyticsService.trackEvent('下拉刷新');
    };
}

function questionCtrl($rootScope, $scope, $ionicLoading, QuestionFactory) {

    var page = 1;

    $ionicLoading.show({
        template: 'Loading...'
    });

    function getData() {

        QuestionFactory.get({
            page: page
        }, function(result) {
            $scope.questions = result.data.rows;
            $ionicLoading.hide();
            $rootScope.$broadcast('scroll.refreshComplete');
        });
    }

    $rootScope.$on('refreshData', function() {
        getData();
    });

    $scope.loadMore = function() {

        QuestionFactory.get({
            page: ++page
        }, function(result) {
            $scope.questions = $scope.questions.concat(result.data.rows);
        });

        AnalyticsService.trackEvent('问答加载更多');
    }

    getData();
}

function questionDetailCtrl($scope, $stateParams, $ionicLoading, QuestionDetailFactory, QuestionAnswerFactory, $cordovaInAppBrowser) {

    $ionicLoading.show({
        template: 'Loading...'
    });

    QuestionDetailFactory.get({
        id: $stateParams.id
    }, function(result) {

        $scope.questionDetail = result.data;

        QuestionAnswerFactory.get({
            id: $stateParams.id
        }, function(result) {

            $scope.answers = result.data.available;
            $ionicLoading.hide();
        });
    });

    $scope.openUrl = function(url) {
        $cordovaInAppBrowser.open(url, '_system');
    }
}

function articleCtrl($rootScope, $scope, $ionicLoading, ArticleFactory) {

    var page = 1;

    $ionicLoading.show({
        template: 'Loading...'
    });

    function getData() {

        ArticleFactory.get({
            page: page
        }, function(result) {
            $scope.articles = result.data.rows;
            $ionicLoading.hide();
            $rootScope.$broadcast('scroll.refreshComplete');
        });
    }

    $rootScope.$on('refreshData', function() {
        getData();
    });

    $scope.loadMore = function() {

        ArticleFactory.get({
            page: ++page
        }, function(result) {
            $scope.articles = $scope.articles.concat(result.data.rows);
        });

        AnalyticsService.trackEvent('文章加载更多');
    }

    getData();
}

function articleDetailCtrl($scope, $stateParams, $ionicLoading, ArticleDetailFactory, $cordovaInAppBrowser) {

    $ionicLoading.show({
        template: 'Loading...'
    });

    ArticleDetailFactory.get({
        id: $stateParams.id
    }, function(result) {

        $scope.articlesDetail = result.data;
        $ionicLoading.hide();
    });

    $scope.openUrl = function(url) {
        $cordovaInAppBrowser.open(url, '_system');
    }
}