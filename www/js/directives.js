angular.module('segmentfault')
    .directive('qaMarkdown', ['$filter', '$compile', function($filter, $compile) {
        return {
            restrict: 'AE',
            template: '<div class="QA-content mb10"></div>',
            replace: true,
            link: function($scope, $element, $attrs) {

                $scope.$watch('questionDetail', function(val) {

                    if(val) {
                        $element.html($filter('markdown')(val.originalText));
                        $compile($element.contents())($scope);
                    }
                });

                $scope.$watch('answer', function(val) {

                    if(val) {
                        $element.html($filter('markdown')(val.originalText));
                        $compile($element.contents())($scope);
                    }
                });
            }
        }
    }])
    .directive('articleMarkdown', ['$filter', '$compile', function($filter, $compile) {
        return {
            restrict: 'AE',
            template: '<div class="article-content mb10"></div>',
            replace: true,
            link: function($scope, $element, $attrs) {

                $scope.$watch('articlesDetail', function(val) {

                    if(val) {
                        $element.html($filter('markdown')(val.originalText));
                        $compile($element.contents())($scope);
                    }
                });
            }
        }
    }]);