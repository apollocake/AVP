
//routes

(function () {
    'use strict';

    angular
        .module('app')
        .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
            //
            // For any unmatched url, redirect to /state1
            $urlRouterProvider.otherwise("/search/");

            $httpProvider.interceptors.push('myHttpInterceptor');
            //
            // Now set up the states
            $stateProvider

                .state('error', {
                    url: "/error",
                    templateUrl: "error/error.html"
                })
                .state('search', {
                    url: "/search/",
                    templateUrl: "search/search.html",
                    controller: 'searchController'
                })
                .state('repo', {
                    url: "/repo/{userId}/{repoId}",
                    templateUrl: "repo/repo.html",
                    controller: 'repoController',
                    controllerAs: 'repoController',
                    //resolve bound vars
                    resolve: {

                        repoService: 'githubRepoService',
                        repoData: function (githubRepoService, $stateParams) {
                            return githubRepoService.getGithubData($stateParams.userId, $stateParams.repoId);
                        }
                    }
                })
                .state('user', {
                    url: "/user/{userId}",
                    templateUrl: "user/user.html",
                    controller: 'userController',
                    controllerAs: 'userController',
                    //resolve bound vars
                    resolve: {

                        userService: 'githubSpecificUserService',
                        userData: function (userService, $stateParams) {
                            return userService.getGithubData($stateParams.userId);
                        }
                    }
                });
        });

})();
