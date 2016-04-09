(function () {
    'use strict';

    angular
        .module('app')
        .controller('todoController', function todoController($scope, $q, myTodoService) {

            $scope.printScope = function () {
                myTodoService.getTodoData().then(
                        function (data) {
                            $scope.todos = data;
                            console.log($scope.todos);
                        });
            }
        });
})();