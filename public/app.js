(function () {
    "use strict";

    angular.module('baby-mean',[
    "ngRoute",
    "ngCookies",
    "posts"
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl: "views/main.html",
                controller: "homeCtrl"
            })
            .otherwise({
                redirectTo: '/'
            });
    });

})();