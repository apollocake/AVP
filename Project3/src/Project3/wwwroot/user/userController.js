//controller for user state
(function () {
    'use strict';

    angular
        .module('app')
        .controller('userController', [
            '$scope', '$stateParams', 'userData', 'githubUserRepoService', 'githubUserFollowerService',
            function ($scope, $stateParams, userData, githubUserRepoService, githubUserFollowerService) {

                $scope.info = {};
                $scope.userData = userData;
                $scope.noRepos = true;
                $scope.noFollowers = true;

                githubUserRepoService.getGithubData($stateParams.userId).then(
                    function (data) {
                        $scope.info.repos = data;
                        if ($scope.info.repos.length !== 0) {
                            $scope.noRepos = false;
                        }
                    });

                githubUserFollowerService.getGithubData($stateParams.userId).then(
                    function (data) {
                        $scope.info.followers = data;
                        if ($scope.info.followers.length !== 0) {
                            $scope.noFollowers = false;
                        }
                    });
            }
        ]);
})();