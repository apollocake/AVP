(function () {
    'use strict';

    angular
        .module('app')
        .controller('todoController', function todoController($scope, $q, myTodoService) {
            $scope.openModal = function (todoname) { console.log(todoname) };
            $scope.moment = moment;
            //
            $scope.mytime = new Date();

            $scope.hstep = 1;
            $scope.mstep = 15;

            $scope.options = {
                hstep: [1, 2, 3],
                mstep: [1, 5, 10, 15, 25, 30]
            };

            $scope.ismeridian = true;
            $scope.toggleMode = function () {
                $scope.ismeridian = !$scope.ismeridian;
            };

            $scope.update = function () {
                var d = new Date();
                d.setHours(14);
                d.setMinutes(0);
                $scope.mytime = d;
            };

            $scope.changed = function () {
                $log.log('Time changed to: ' + $scope.mytime);
            };

            $scope.clear = function () {
                $scope.mytime = null;
            };
            //

            $scope.todoList = {};
            $scope.newTodo = {};

            $scope.predicate = 'name';
            $scope.reverse = true;
            $scope.order = function (predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };


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
                            $scope.warningDays = $scope.todoList[0].warningDays;
                            console.log($scope.todoList[0].warningDays);
                            //needed to flush old todos!
                            $scope.todos = $scope.todoList[0].todos;
                            console.log($scope.todoList[0].todos[0].dueDate);
                            
                            console.log($scope.todoList[0].todos[0].state);
                            console.log($scope.todoList[0].todos[0].tags[0].name);

                        });
            }

            $scope.deleteId = function (id) {
                myTodoService.deleteTodo(id);
                location.reload();
            }

            $scope.printTodo = function (todo) {
                console.log(todo.id);
                console.log(todo.name);
                console.log(todo.dueDate);
                console.log(todo.state);
                var tags = todo.tags;
                for (var i = 0; i < tags.length; i++) {
                    console.log('tagnumber ' + i);

                    console.log(tags[i].name);
                }
                    var  data = 
                        {
                            "id": todo.id,
                            "name": todo.name,
                            "state": todo.state,
                            "dueDate": todo.dueDate,
                            "tags": tags
                        };
                    myTodoService.updateTodo(angular.toJson(data));
            }

            //$scope.addItem = function () {

            //    var  data = 
            //        {
            //            "name": "seed from todoControoler",
            //            "state": "Completed",
            //            "dueDate": "3/23/2016 12:31:00",
            //            "tags": [
            //                {
            //                    "name": "wilson!"
            //                },
            //                {
            //                    "name": "wilson yeah!"
            //                }
            //            ]
            //        };
            //    myTodoService.addTodo(angular.toJson(data));
            //}


            $scope.addItem = function() {

                var data =
                    {
                        "name": $scope.newTodo.name,
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
                $scope.newTodo = {};
                $scope.printData();
                $scope.printScope();
                location.reload();
            }

            $scope.updateTodo = function () {

                var data =
                    {
                        "id": 1,
                        "name": "seed from todoControoler updated",
                        "state": "Active",
                        "dueDate": "3/23/2016 12:31:00",
                        "tags": [
                            {
                                "name": "im the first!"
                            },
                            {
                                "name": "I disigreee!"
                            },
                            {
                                 "name": "cool brah!"
                            }
                                                        
                        ]
                    };
                myTodoService.updateTodo(angular.toJson(data));
            }
            $scope.updateWarning = function () {

                var data =
                    {
                        "warningDays": 10
                    };
                myTodoService.updateWarning(angular.toJson(data));
            }
            $scope.deleteTodo = function () {
                var id = 1;
                myTodoService.deleteTodo(id);
            }
        });
})();