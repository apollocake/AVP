////github factory for searching repos
//(function () {
//    'use strict';

//    angular
//        .module('app')
//        .factory('githubService', githubService);


//    function githubService($http, $q) {
//        //link to service
//        var factory = {
//            getGithubData: getGithubData
//        };

//        //return handle for later use
//        return factory;

//        //implement actual data usage in controller
//        function getGithubData(repoId, pageNo) {
//            var deferred = $q.defer();
//            $http.get('https://api.github.com/search/repositories?q=' + repoId + '&page=' + pageNo + '&per_page=10').then(function (response) {
//                //use q promise handler to resolve w/defer function
//                //defers it to the caller to handle the data in the response object
//                deferred.resolve(response.data);
//            });
//            return deferred.promise;
//        }
//    }
//})();

////github factory for searching commits

//(function () {
//    'use strict';

//    angular
//        .module('app')
//        .factory('githubCommitService', githubCommitService);


//    function githubCommitService($http, $q) {
//        //link to service
//        var factory = {
//            getGithubData: getGithubData
//        };

//        //return handle for later use
//        return factory;

//        //implement actual data usage in controller
//        function getGithubData(userId, repoId) {
//            var deferred = $q.defer();
//            $http.get('https://api.github.com/repos/' + userId + '/' + repoId + '/commits').then(function (response) {
//                //use q promise handler to resolve w/defer function
//                //defers it to the caller to handle the data in the response object
//                deferred.resolve(response.data);
//            });
//            return deferred.promise;
//        }
//    }
//})();

////github factory for searching issues

//(function () {
//    'use strict';

//    angular
//        .module('app')
//        .factory('githubIssuesService', githubIssuesService);


//    function githubIssuesService($http, $q) {
//        //link to service
//        var factory = {
//            getGithubData: getGithubData
//        };

//        //return handle for later use
//        return factory;

//        //implement actual data usage in controller
//        function getGithubData(userId, repoId) {
//            var deferred = $q.defer();
//            $http.get('https://api.github.com/repos/' + userId + '/' + repoId + '/issues').then(function (response) {
//                //use q promise handler to resolve w/defer function
//                //defers it to the caller to handle the data in the response object
//                deferred.resolve(response.data);
//            });
//            return deferred.promise;
//        }
//    }
//})();

////github factory for searching users

//(function () {
//    'use strict';

//    angular
//        .module('app')
//        .factory('githubUserService', githubUserService);


//    function githubUserService($http, $q) {
//        //link to service
//        var factory = {
//            getGithubData: getGithubData
//        };

//        //return handle for later use
//        return factory;

//        //implement actual data usage in controller
//        function getGithubData(query, pageNo) {
//            var deferred = $q.defer();
//            $http.get('https://api.github.com/search/users?q=' + query + '&page=' + pageNo + '&per_page=10').then(function successCallBack(response) {
//                //use q promise handler to resolve w/defer function
//                //defers it to the caller to handle the data in the response object
//                deferred.resolve(response.data);
//            }, function errorCallBack(response) {
//                //use q promise handler to resolve w/defer function
//                //defers it to the caller to handle the data in the response object
//                deferred.reject(response.status);
//            });
//            return deferred.promise;
//        }
//    }
//})();

////github factory for repos

(function () {
    'use strict';

    angular
        .module('app')
        .factory('myTodoService', myTodoService);


    function myTodoService($http, $q) {
        //link to service
        var factory = {
            getTodoData: getTodoData
        };

        //return handle for later use
        return factory;

        //implement actual data usage in controller
        function getTodoData() {
            var deferred = $q.defer();
            $http.get('api/todo').then(function successCallBack(response) {
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

//github factory for user state

//(function () {
//    'use strict';

//    angular
//        .module('app')
//        .factory('githubSpecificUserService', githubSpecificUserService);


//    function githubSpecificUserService($http, $q) {
//        //link to service
//        var factory = {
//            getGithubData: getGithubData
//        };

//        //return handle for later use
//        return factory;

//        //implement actual data usage in controller
//        function getGithubData(userId) {
//            var deferred = $q.defer();
//            $http.get('https://api.github.com/users/' + userId).then(function (response) {
//                //use q promise handler to resolve w/defer function
//                //defers it to the caller to handle the data in the response object
//                deferred.resolve(response.data);
//            });
//            return deferred.promise;
//        }
//    }
//})();

////github factory for searching the users repos

//(function () {
//    'use strict';

//    angular
//        .module('app')
//        .factory('githubUserRepoService', githubUserRepoService);


//    function githubUserRepoService($http, $q) {
//        //link to service
//        var factory = {
//            getGithubData: getGithubData
//        };

//        //return handle for later use
//        return factory;

//        //implement actual data usage in controller
//        function getGithubData(userId) {
//            var deferred = $q.defer();
//            $http.get('https://api.github.com/users/' + userId + '/repos').then(function (response) {
//                //use q promise handler to resolve w/defer function
//                //defers it to the caller to handle the data in the response object
//                deferred.resolve(response.data);
//            });
//            return deferred.promise;
//        }
//    }
//})();


////github factory for searching the users followers

//(function () {
//    'use strict';

//    angular
//        .module('app')
//        .factory('githubUserFollowerService', githubUserFollowerService);


//    function githubUserFollowerService($http, $q) {
//        //link to service
//        var factory = {
//            getGithubData: getGithubData
//        };

//        //return handle for later use
//        return factory;

//        //implement actual data usage in controller
//        function getGithubData(userId) {
//            var deferred = $q.defer();
//            $http.get('https://api.github.com/users/' + userId + '/followers').then(function (response) {
//                //use q promise handler to resolve w/defer function
//                //defers it to the caller to handle the data in the response object
//                deferred.resolve(response.data);
//            });
//            return deferred.promise;
//        }
//    }
//})();