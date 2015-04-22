angular.module('segmentfault')

.controller('QuestionCtrl', [
    '$scope',
    'QuestionFactory',
    questionCtrl
])
.controller('QuestionDetailCtrl', [
    '$scope',
    '$stateParams',
    'QuestionDetailFactory',
    questionDetailCtrl
]);

function questionCtrl($scope, QuestionFactory) {

    QuestionFactory.get(function(result) {
        $scope.questions = result.data;
    });
}

function questionDetailCtrl($scope, $stateParams, QuestionDetailFactory) {

     QuestionDetailFactory.get({id: $stateParams.id}, function(result) {
        $scope.questionDetail = result.data;
    })
}