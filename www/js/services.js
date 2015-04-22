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
]);

function questionFactory(API_HOST, $resource) {

    var url = API_HOST + '?url=http://api.segmentfault.com/question/newest';

    return $resource(url);
}

function questionDetailFactory(API_HOST, $resource) {

    var url = API_HOST + '?url=http://api.segmentfault.com/question/:id';

    return $resource(url, {
        id: '@id'
    });
}