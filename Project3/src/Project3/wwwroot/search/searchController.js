
//searchcontroller (built from faqcontroller)

(function () {
    'use strict';

    angular
        .module('app')
        .controller('searchController', function searchController($scope, $q, githubService, githubUserService) {

            $scope.clearVars = function () {
                //initialize all vars for each search
                $scope.info = {};
                $scope.returnedUser = false;
                $scope.returnedRepo = false;
                $scope.completedSearch = false;
                $scope.resultsCount = 0;
                $scope.currentpage = 1;
                $scope.maxPages = 1;
            }
            $scope.searchGithub = function () {
                //redo all calculated vars if search is re-clicked
                //$scope.returnedUser = false;
                //$scope.returnedRepo = false;
                //$scope.completedSearch = false;
                //$scope.resultsCount = 0;
                //$scope.maxPages = 1;
                if ($scope.repoUser.selection === 'repo') {
                    githubService.getGithubData($scope.query, $scope.currentpage).then(
                        function (data) {
                            $scope.info.repos = data;
                            //reposCount triggers pagination visibility
                            $scope.resultsCount = data.total_count;
                            $scope.returnedRepo = true;
                            $scope.completedSearch = true;
                            $scope.maxPages = Math.ceil($scope.info.repos.total_count / $scope.info.repos.items.length);
                        });
                } else if ($scope.repoUser.selection === 'user') {
                    githubUserService.getGithubData($scope.query, $scope.currentpage).then(
                        function (data) {

                            $scope.info.userdata = data;
                            $scope.resultsCount = data.total_count;
                            $scope.returnedUser = true;
                            $scope.completedSearch = true;
                            $scope.maxPages = Math.ceil($scope.info.userdata.total_count / $scope.info.userdata.items.length);

                        },
                        function (reason) {
                            //hopefully any http status codes finally resolve here :(
                            //console.log("we handled the error from the promise!")
                            console.log(reason);
                            $scope.resultsCount = 0;
                            $scope.completedSearch = true;

                        });
                }
            }
            //wrapper for two functions because of onClick
            $scope.clearThenSearch = function () {
                $scope.clearVars();
                $scope.searchGithub();
            }

            $scope.goForward = function () {
                $scope.currentpage = $scope.currentpage + 1;
                $scope.searchGithub();
            }
            $scope.goBackward = function () {
                $scope.currentpage = $scope.currentpage - 1;
                $scope.searchGithub();
            }

        });
})();
