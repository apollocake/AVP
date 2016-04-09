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
