(function () {
    'use strict';

    angular
        .module('app')
        .factory('myTodoService', myTodoService);


    function myTodoService($http, $q) {
        //link to service
        var factory = {
            getTodoData: getTodoData,
            addTodo: addTodo,
            updateTodo: updateTodo,
            updateWarning: updateWarning
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
        function addTodo(data) {
            var deferred = $q.defer();
            $http.post('api/todo', data).then(function successCallBack(response) {
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
        function updateTodo(data) {
            var deferred = $q.defer();
            $http.put('api/todo', data).then(function successCallBack(response) {
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
        function updateWarning(data) {
            var deferred = $q.defer();
            $http.put('api/todo/warning', data).then(function successCallBack(response) {
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
