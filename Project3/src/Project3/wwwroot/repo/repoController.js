
//repocontroller

(function () {
    'use strict';

    angular
        .module('app')
        .controller('repoController', [
            '$scope', '$stateParams', 'repoData', 'githubCommitService', 'githubIssuesService',
            function ($scope, $stateParams, repoData, githubCommitService, githubIssuesService) {

                $scope.info = {};
                $scope.currentPage = 0;
                $scope.pageSize = 10;
                $scope.info.issues = [];
                $scope.noIssues = true;
                $scope.numberOfPages = function () {
                    return Math.ceil($scope.info.issues.length / $scope.pageSize);
                }


                $scope.repoData = repoData;
                $scope.printParams = function () {
                    console.log($stateParams);
                    console.log(repoData);

                }

                githubCommitService.getGithubData($stateParams.userId, $stateParams.repoId).then(
                    function (data) {
                        $scope.info.commits = data;
                        $scope.info.commits = $scope.info.commits.slice(0, 5);
                        console.log("commits");
                        console.log($scope.info.commits);
                    });

                githubIssuesService.getGithubData($stateParams.userId, $stateParams.repoId).then(
                    function (data) {
                        $scope.info.issues = data;
                        console.log("issues");
                        console.log($scope.info.issues);
                        if ($scope.info.issues.length !== 0) {
                            $scope.noIssues = false;
                        }
                    });
            }
        ]);
})();
