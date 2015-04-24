angular.module('segmentfault')

.factory('QuestionFactory', [
    'API_HOST',
    '$resource',
    questionFactory
])
.factory('QuestionDetailFactory', [
    'API_HOST',
    '$resource',
    questionDetailFactory
])
.factory('QuestionAnswerFactory', [
    'API_HOST',
    '$resource',
    questionAnswerFactory
])
.factory('ArticleFactory', [
    'API_HOST',
    '$resource',
    articleFactory
])
.factory('ArticleDetailFactory', [
    'API_HOST',
    '$resource',
    articleDetailFactory
])
.factory('AnalyticsService', [
    analyticsService
]);

function questionFactory(API_HOST, $resource) {

    var url = API_HOST + '?url=http://api.segmentfault.com/question/newest?page=:page';

    return $resource(url, {
        page: '@page'
    });
}

function questionDetailFactory(API_HOST, $resource) {

    var url = API_HOST + '?url=http://api.segmentfault.com/question/:id';

    return $resource(url, {
        id: '@id'
    });
}

function questionAnswerFactory(API_HOST, $resource) {

    var url = API_HOST + '?url=http://api.segmentfault.com/answer/show/:id';

    return $resource(url, {
        id: '@id'
    });
}

function articleFactory(API_HOST, $resource) {

    var url = API_HOST + '?url=http://api.segmentfault.com/article/newest?page=:page';

    return $resource(url, {
        page: '@page'
    });
}

function articleDetailFactory(API_HOST, $resource) {

    var url = API_HOST + '?url=http://api.segmentfault.com/article/:id';

    return $resource(url, {
        id: '@id'
    });
}

function analyticsService() {

    var _startTime, _endTime;

    return {

        analyticsEnable: false,

        init: function() {

            var that = this;
            analytics.startTrackerWithId('UA-61510216-2', function() {

                that.analyticsEnable = true;
            }, function(err) {
            });
        },

        viewStart: function(page) {

            _startTime = new Date().getTime();

            if (window.analytics && this.analyticsEnable) {
                analytics.trackView(page, function() {
                }, function(err) {
                });
            }
        },

        viewEnd: function(page) {

            _endTime = new Date().getTime();

            if (window.analytics && this.analyticsEnable) {
                analytics.trackTiming(page, _endTime - _startTime);
            }
        },

        trackEvent: function(eventName) {

            if (window.analytics && this.analyticsEnable) {
                analytics.trackEvent('UIEvent', eventName);
            }
        }
    }
}