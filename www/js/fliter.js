angular.module('segmentfault')
    .filter('markdown', ['$sce', function($sce) {

        return function(text) {
            
            var imgHost = 'http://www.segmentfault.com/img/';

            if(text) {

                var regA = /<a.*<\/a>/igm,
                    regUrl = /href="(.*)"/;

                var html = marked(text.replace(/\/img\//ig, imgHost));

                html = html.replace(regA, function(str) {

                    var url = str.match(regUrl);

                    return '<span class="span-url" ng-click="openUrl(\''+ url[1] +'\')">'+ url[1] +'</span>'
                });

                return $sce.trustAsHtml(html);    
            } else {
                return text;
            }
        }
    }])
    .filter('protocol', function() {

        return function(url) {

            if(url) {

                return url.indexOf('http:') > -1 ? url : 'http:' + url;
            }
        }
    });