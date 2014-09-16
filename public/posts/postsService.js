(function () {
    "use strict";

    angular
        .module('posts')
        .factory('postsService', ['$http', '$rootScope', function ($http, $rootScope) {



            var baseUrl = "api/collections/demotiy";

            var getPosts = function () {

                return $http.get(baseUrl);
            };

            var getPost = function (postId) {
                return $http.get(baseUrl + "/" + postId);
            };

            var createPost = function (newPost) {
                $http.post(baseUrl, newPost).then(function (res) {
                    $rootScope.$broadcast("post:added");
                })
            };

            var editPost = function (post) {
                $http.put(baseUrl + "/" + post._id, post).then(function (res) {
                    $rootScope.$broadcast("post:updated");
                })

            };

            var deletePost = function (postId) {
                $http.delete(baseUrl + "/" + postId).then(function (res) {
                    $rootScope.$broadcast("post:deleted");
                })
            };

            // public service methods
            return {
                getPosts: getPosts,
                getPost: getPost,
                createPost: createPost,
                editPost: editPost,
                deletePost: deletePost
            };

        }]);
})();