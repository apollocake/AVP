(function () {
    'use strict';

    angular
        .module('app')
        .controller('todoController', function todoController($scope, $q, myTodoService) {
            $scope.moment = moment;
            //
            $scope.mytime = new Date();

            $scope.hstep = 1;
            $scope.mstep = 1;
            
            $scope.todoList = {};
            $scope.newTodo = {};

            $scope.ismeridian = true;
            $scope.toggleMode = function () {
                $scope.ismeridian = !$scope.ismeridian;
            };

            $scope.updateDate = function (todo) {
                //moment('3/23/2016 16:31:00').local().utc().format('M/D/Y HH:mm:ss');
                todo.dueDate = moment(todo.month.toString() + '/' +
                    todo.day.toString() + '/' +
                    todo.year.toString() + '/ ' +
                    todo.hours.toString() + ':' +
                    todo.minutes.toString() + ':' +
                    todo.seconds.toString())
                    .local().utc().format('M/D/Y HH:mm:ss');
                var data =
                    {
                        "id": todo.id,
                        "name": todo.name,
                        "state": todo.state,
                        "dueDate": todo.dueDate,
                        "tags": todo.tags
                    };
                myTodoService.updateTodo(angular.toJson(data));

            }

            $scope.durationCheck = function (todo) {
                var a = moment(todo.dueDate);
                var b = moment(moment().format('M/D/Y HH:mm:ss'));
                var diff = a.diff(b);

                if (diff < 0) {
                    return 'red';
                }
                else if (a.diff(b, 'days') < $scope.todoList[0].warningDays) {
                    return 'yellow';
                }
                
            }
            


            //for sorting
            $scope.predicate = 'name';
            $scope.reverse = true;
            $scope.order = function (predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };


            $scope.getTodoList = function () {
                myTodoService.getTodoData().then(
                        function (data) {
                            var dataString = angular.fromJson(data);
                            $scope.todoList = dataString;
                            $scope.warningDays = $scope.todoList[0].warningDays;
                            //needed to flush old todos!
                            $scope.todos = $scope.todoList[0].todos;
                            
                            for (var i = 0; i < $scope.todos.length; i++) {
                                $scope.todos[i].formattedDueDate = $scope.todos[i].dueDate;
                                $scope.todos[i].year = moment.utc($scope.todos[i].dueDate).local().format('Y');
                                $scope.todos[i].month = moment.utc($scope.todos[i].dueDate).local().format('M');
                                $scope.todos[i].day = moment.utc($scope.todos[i].dueDate).local().format('D');
                                $scope.todos[i].hours = moment.utc($scope.todos[i].dueDate).local().format('H');
                                $scope.todos[i].minutes = moment.utc($scope.todos[i].dueDate).local().format('m');
                                $scope.todos[i].seconds = moment.utc($scope.todos[i].dueDate).local().format('s');
                            }
                        });
            }


            $scope.deleteTodo = function (id) {
                myTodoService.deleteTodo(id);
                location.reload();
            }

            $scope.updateTodo = function (todo) {
                    var  data = 
                        {
                            "id": todo.id,
                            "name": todo.name,
                            "state": todo.state,
                            "dueDate": todo.dueDate,
                            "tags": todo.tags
                        };
                    myTodoService.updateTodo(angular.toJson(data));
            }

            $scope.makeCompleted = function (todo) {
                var data =
                    {
                        "id": todo.id,
                        "name": todo.name,
                        "state": 'Completed',
                        "dueDate": todo.dueDate,
                        "tags": todo.tags
                    };
                myTodoService.updateTodo(angular.toJson(data));
                todo.state = 'Completed';
            }

            $scope.makeUncompleted = function (todo) {
                var tags = todo.tags;
                var data =
                    {
                        "id": todo.id,
                        "name": todo.name,
                        "state": 'Active',
                        "dueDate": todo.dueDate,
                        "tags": tags
                    };
                myTodoService.updateTodo(angular.toJson(data));
                todo.state = 'Active';
            }




            $scope.addItem = function() {
                var time = moment().add(7, 'days').local().utc().format('M/D/Y HH:mm:ss');
                var data =
                    {
                        "name": $scope.newTodo.name,
                        "state": "Active",
                        "dueDate": time,
                        "tags": []
                    };
                myTodoService.addTodo(angular.toJson(data));
                //$scope.newTodo = {};
                //$scope.getTodoList();
                location.reload();
            }

            $scope.addTag = function (todo, newTag) {
                var tags = todo.tags;
                tags.push(newTag);

                var data =
                    {
                        "id": todo.id,
                        "name": todo.name,
                        "state": todo.state,
                        "dueDate": todo.dueDate,
                        "tags": tags
                    };
                myTodoService.updateTodo(angular.toJson(data));
                location.reload();

            }
            $scope.deleteTag = function (todo, tagToDelete) {

                var tags = todo.tags;

                for (var i = 0; i < tags.length; i++) {
                    if (tags[i].name === tagToDelete.name) {
                        if (i > -1) {
                            tags.splice(i, 1);
                        }
                    }
                }
                var data =
                    {
                        "id": todo.id,
                        "name": todo.name,
                        "state": todo.state,
                        "dueDate": todo.dueDate,
                        "tags": tags
                    };
                myTodoService.updateTodo(angular.toJson(data));
                location.reload();

            }
            $scope.updateWarning = function () {

                var data =
                {
                    "id": 1,
                    "warningDays": $scope.warningDays
                };
                myTodoService.updateWarning(angular.toJson(data));
                window.location = "/";
            }

        });
})();