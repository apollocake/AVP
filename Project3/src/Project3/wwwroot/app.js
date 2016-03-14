(function () {
    'use strict';

    angular.module('app', [
        // Angular modules 
        'ui.bootstrap',
        // Custom modules 
        'ui.router',
        // 3rd Party Modules
        'ui.bootstrap.showErrors'
    ])

    .controller('appController', function ($rootScope, $state, myToastr) {
        //on is an event listener (name, action)
        //stateChangeError is built in ui router transition for states
        $rootScope.$on("$stateChangeError", console.log.bind(console));
        $rootScope.$on("$stateChangeError", function () {
            $state.go('error');
        });
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams, options) {
                //myToastr.warning('Starting state ' + toState.name);
            });
        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                //myToastr.warning('At state ' + toState.name + ' from ' + fromState.name);
            });

    })
        //registering toastr warning with provide service via decorator
        .config(function ($provide) {
            //decorator(nameOfServiceToDecorate, function that encapsulates new behavior must return func|string)
            //delegate is an approved local injection arg
            $provide.decorator('$exceptionHandler', function extendExceptionHandler($delegate, myToastr) {
                return function (exception, cause) {
                    //where the actual decorating happens with
                    $delegate(exception, cause);

                    /**
                     * Could add the error to a service's collection,
                     * add errors to $rootScope, log errors to remote web server,
                     * or log locally. Or throw hard. It is entirely up to you.
                     * throw exception;
                     */
                    //myToastr.warning(exception.message);
                };
            });



        });
})();

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


//searchcontroller (built from faqcontroller)

(function () {
    'use strict';

    angular
        .module('app')
        .controller('searchController', function searchController($scope, $q, githubService, githubUserService) {

            $scope.clearVars = function()
            {
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
                            console.log("repos from githubService");
                            console.log($scope.info.repos);
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
                            console.log("userdata from githubUserService");
                            console.log($scope.info.userdata);
                            $scope.resultsCount = data.total_count;
                            $scope.returnedUser = true;
                            $scope.completedSearch = true;
                            console.log($scope.info.userdata);
                            $scope.maxPages = Math.ceil($scope.info.userdata.total_count / $scope.info.userdata.items.length);

                        },
                        function (reason) {
                            //hopefully any http status codes finally resolve here :(
                            console.log("we handled the error from the promise!")
                            console.log(reason);
                            $scope.resultsCount = 0;
                            $scope.completedSearch = true;

                        });
                }
            }
            //wrapper for two functions because of onClick
            $scope.clearThenSearch = function() {
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

//filter for issues pagination
(function () {
    'use strict';
    angular
        .module('app')
        .filter('startFrom', function () {
            return function (input, start) {
                start = +start; //parse to int
                return input.slice(start);
            }
        });
})();

//errorinterceptorfactory

(function () {
    'use strict';

    angular
        .module('app')
        .factory('myHttpInterceptor', function ($q, myToastr) {
            return {
                'responseError': function (rejection) {
                    // do something on error
                    //myToastr.warning('An error has occurred.');
                    return $q.reject(rejection);
                }
            };
        });
})();

//mytoastrfactory

(function () {
    'use strict';

    angular
        .module('app')
        .factory('myToastr', myToastrFactory);


    function myToastrFactory() {
        var warningCount = 0;

        var service = {
            warning: warning
        };

        return service;
        //warning is warning as warning is warning...
        function warning(message) {
            //warningCount = warningCount + 1;
            //actual toaster library call
            toastr.warning(message + warningCount);
        }
    }
})();

//github factory for searching repos

(function () {
    'use strict';

    angular
        .module('app')
        .factory('githubService', githubService);


    function githubService($http, $q) {
        //link to service
        var factory = {
            getGithubData: getGithubData
        };

        //return handle for later use
        return factory;

        //implement actual data usage in controller
        function getGithubData(repoId, pageNo) {
            var deferred = $q.defer();
            $http.get('https://api.github.com/search/repositories?q=' + repoId + '&page=' + pageNo + '&per_page=10').then(function (response) {
                //use q promise handler to resolve w/defer function
                //defers it to the caller to handle the data in the response object
                deferred.resolve(response.data);
            });
            return deferred.promise;
        }
    }
})();

//github factory for searching commits

(function () {
    'use strict';

    angular
        .module('app')
        .factory('githubCommitService', githubCommitService);


    function githubCommitService($http, $q) {
        //link to service
        var factory = {
            getGithubData: getGithubData
        };

        //return handle for later use
        return factory;

        //implement actual data usage in controller
        function getGithubData(userId, repoId) {
            var deferred = $q.defer();
            $http.get('https://api.github.com/repos/' + userId + '/' + repoId + '/commits').then(function (response) {
                //use q promise handler to resolve w/defer function
                //defers it to the caller to handle the data in the response object
                deferred.resolve(response.data);
            });
            return deferred.promise;
        }
    }
})();

//github factory for searching issues

(function () {
    'use strict';

    angular
        .module('app')
        .factory('githubIssuesService', githubIssuesService);


    function githubIssuesService($http, $q) {
        //link to service
        var factory = {
            getGithubData: getGithubData
        };

        //return handle for later use
        return factory;

        //implement actual data usage in controller
        function getGithubData(userId, repoId) {
            var deferred = $q.defer();
            $http.get('https://api.github.com/repos/' + userId + '/' + repoId + '/issues').then(function (response) {
                //use q promise handler to resolve w/defer function
                //defers it to the caller to handle the data in the response object
                deferred.resolve(response.data);
            });
            return deferred.promise;
        }
    }
})();

//github factory for searching users

(function () {
    'use strict';

    angular
        .module('app')
        .factory('githubUserService', githubUserService);


    function githubUserService($http, $q) {
        //link to service
        var factory = {
            getGithubData: getGithubData
        };

        //return handle for later use
        return factory;

        //implement actual data usage in controller
        function getGithubData(query, pageNo) {
            var deferred = $q.defer();
            $http.get('https://api.github.com/search/users?q=' + query + '&page=' + pageNo + '&per_page=10').then(function successCallBack(response) {
                //use q promise handler to resolve w/defer function
                //defers it to the caller to handle the data in the response object
                deferred.resolve(response.data);
            }, function errorCallBack(response) {
                //use q promise handler to resolve w/defer function
                //defers it to the caller to handle the data in the response object
                deferred.reject(response.status);
            });
            return deferred.promise;
        }
    }
})();

//github factory for repos

(function () {
    'use strict';

    angular
        .module('app')
        .factory('githubRepoService', githubRepoService);


    function githubRepoService($http, $q) {
        //link to service
        var factory = {
            getGithubData: getGithubData
        };

        //return handle for later use
        return factory;

        //implement actual data usage in controller
        function getGithubData(userId, repoId) {
            var deferred = $q.defer();
            $http.get('https://api.github.com/repos/' + userId + '/' + repoId).then(function (response) {
                //use q promise handler to resolve w/defer function
                //defers it to the caller to handle the data in the response object
                deferred.resolve(response.data);
            });
            return deferred.promise;
        }
    }
})();

//github factory for user state

(function () {
    'use strict';

    angular
        .module('app')
        .factory('githubSpecificUserService', githubSpecificUserService);


    function githubSpecificUserService($http, $q) {
        //link to service
        var factory = {
            getGithubData: getGithubData
        };

        //return handle for later use
        return factory;

        //implement actual data usage in controller
        function getGithubData(userId) {
            var deferred = $q.defer();
            $http.get('https://api.github.com/users/' + userId).then(function (response) {
                //use q promise handler to resolve w/defer function
                //defers it to the caller to handle the data in the response object
                deferred.resolve(response.data);
            });
            return deferred.promise;
        }
    }
})();

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

//github factory for searching the users repos

(function () {
    'use strict';

    angular
        .module('app')
        .factory('githubUserRepoService', githubUserRepoService);


    function githubUserRepoService($http, $q) {
        //link to service
        var factory = {
            getGithubData: getGithubData
        };

        //return handle for later use
        return factory;

        //implement actual data usage in controller
        function getGithubData(userId) {
            var deferred = $q.defer();
            $http.get('https://api.github.com/users/' + userId + '/repos').then(function (response) {
                //use q promise handler to resolve w/defer function
                //defers it to the caller to handle the data in the response object
                deferred.resolve(response.data);
            });
            return deferred.promise;
        }
    }
})();


//github factory for searching the users followers

(function () {
    'use strict';

    angular
        .module('app')
        .factory('githubUserFollowerService', githubUserFollowerService);


    function githubUserFollowerService($http, $q) {
        //link to service
        var factory = {
            getGithubData: getGithubData
        };

        //return handle for later use
        return factory;

        //implement actual data usage in controller
        function getGithubData(userId) {
            var deferred = $q.defer();
            $http.get('https://api.github.com/users/' + userId + '/followers').then(function (response) {
                //use q promise handler to resolve w/defer function
                //defers it to the caller to handle the data in the response object
                deferred.resolve(response.data);
            });
            return deferred.promise;
        }
    }
})();