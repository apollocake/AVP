(function () {
    'use strict';

    angular
        .module('app')
        .controller('todoController', function todoController($scope, $q, myTodoService) {

            $scope.printScope = function () {
                myTodoService.getTodoData().then(
                        function (data) {
                            $scope.todoList = data;
                            console.log($scope.todoList);
                        });
            }
            $scope.printData = function () {
                myTodoService.getTodoData().then(
                        function (data) {
                            var dataString = angular.fromJson(data);
                            $scope.todoList = dataString;
                            console.log($scope.todoList);
                            console.log($scope.todoList[0].warningDays);
                            console.log($scope.todoList[0].todos[0].dueDate);
                            console.log($scope.todoList[0].todos[0].state);
                            console.log($scope.todoList[0].todos[0].tags[0].name);

                        });
            }

            $scope.addItem = function () {

                var  data = 
                    {
                        "name": "seed from todoControoler",
                        "state": "Completed",
                        "dueDate": "3/23/2016 12:31:00",
                        "tags": [
                            {
                                "name": "wilson!"
                            },
                            {
                                "name": "wilson yeah!"
                            }
                        ]
                    };
                myTodoService.addTodo(angular.toJson(data));
            }
        });
})();