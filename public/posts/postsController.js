(function () {
    "use strict";

    angular
        .module('posts')
        .controller('postsController', ['$scope', 'postsService', '$location', '$routeParams', function ($scope, postsService, $location, $routeParams) {
            postsService.getPosts().success(function (posts) {
                $scope.posts = posts;
            });

            postsService.getPost($routeParams.postId).success(function (post) {
                $scope.post = post;
            });

            $scope.createPost = function (newPost) {
                postsService.createPost(newPost);
                $location.path('/posts');
            };

            $scope.editPost = function (post) {
                postsService.editPost(post);
                $location.path('/posts');
            };

            $scope.deletePost = function (id) {
                postsService.deletePost(id);
                $location.path('/posts');
            }


        }]);
})();