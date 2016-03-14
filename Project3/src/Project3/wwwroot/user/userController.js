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
                $scope.printParams = function () {
                    console.log($stateParams);
                    console.log(userData);
                }

                githubUserRepoService.getGithubData($stateParams.userId).then(
                    function (data) {
                        $scope.info.repos = data;
                        console.log("the users repos");
                        console.log($scope.info.repos);
                        if ($scope.info.repos.length !== 0) {
                            $scope.noRepos = false;
                        }
                    });

                githubUserFollowerService.getGithubData($stateParams.userId).then(
                    function (data) {
                        $scope.info.followers = data;
                        console.log("the followers of the user");
                        console.log($scope.info.followers);
                        if ($scope.info.followers.length !== 0) {
                            $scope.noFollowers = false;
                        }
                    });
            }
        ]);
})();