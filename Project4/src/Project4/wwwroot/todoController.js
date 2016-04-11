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
            $scope.mstep = 1;


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
                console.log('Time changed to: ' + $scope.mytime);
            };

            $scope.clear = function () {
                $scope.mytime = null;
            };
            $scope.dateToYear = function (date) {
                $scope.mytime.setFullYear(moment.utc(date).local().format('Y'));
                $scope.year = $scope.mytime.getFullYear();
                return $scope.year;
            }
            $scope.dateToMonth = function (date) {
                $scope.mytime.setMonth(moment.utc(date).local().format('M'));
                $scope.month = $scope.mytime.getMonth();
                return $scope.month;
            }
            $scope.dateToDay = function (date) {
                $scope.mytime.setDate(moment.utc(date).local().format('D'));
                $scope.day = $scope.mytime.getDate();
                return $scope.day;
            }

            $scope.dateToHour = function(date) {
                $scope.mytime.setHours(moment.utc(date).local().format('H'));
                $scope.hours = $scope.mytime.getHours();
                return $scope.hours;
            }

            $scope.dateToMinute = function (date) {
                $scope.mytime.setMinutes(moment.utc(date).local().format('m'));
                $scope.minutes = $scope.mytime.getMinutes();
                return $scope.minutes;
            }

            $scope.printFullDate = function (todo) {
                console.log(todo.year);
                console.log(todo.month);
                console.log(todo.day);
                console.log(todo.hours);
                console.log(todo.minutes);
                console.log(todo.seconds);
                //moment('3/23/2016 16:31:00').local().utc().format('M/D/Y HH:mm:ss');
                todo.dueDate = moment(todo.month.toString() + '/' +
                    todo.day.toString() + '/' +
                    todo.year.toString() + '/ ' +
                    todo.hours.toString() + ':' +
                    todo.minutes.toString() + ':' +
                    todo.seconds.toString())
                    .local().utc().format('M/D/Y HH:mm:ss');
                console.log(todo.dueDate);
                var tags = todo.tags;
                for (var i = 0; i < tags.length; i++) {
                    console.log('tagnumber ' + i);

                    console.log(tags[i].name);
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
                            
                            for (var i = 0; i < $scope.todos.length; i++) {
                                $scope.todos[i].formattedDueDate = $scope.todos[i].dueDate;
                                $scope.todos[i].year = moment.utc($scope.todos[i].dueDate).local().format('Y');
                                $scope.todos[i].month = moment.utc($scope.todos[i].dueDate).local().format('M');
                                $scope.todos[i].day = moment.utc($scope.todos[i].dueDate).local().format('D');
                                $scope.todos[i].hours = moment.utc($scope.todos[i].dueDate).local().format('H');
                                $scope.todos[i].minutes = moment.utc($scope.todos[i].dueDate).local().format('m');
                                $scope.todos[i].seconds = moment.utc($scope.todos[i].dueDate).local().format('s');
                            }
                            console.log($scope.todoList[0].todos[0].dueDate);
                            
                            console.log($scope.todoList[0].todos[0].state);
                            console.log($scope.todoList[0].todos[0].tags[0].name);
                            console.log($scope.todos);
                        });
            }
            $scope.printTime = function (dueDate) {
               console.log('time is ' + $scope.hours + ' ' + $scope.minutes);
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

            $scope.addTag = function (todo, newTag) {
                console.log(todo.id);
                console.log(todo.name);
                console.log(todo.dueDate);
                console.log(todo.state);
                var tags = todo.tags;
                tags.push(newTag);
                for (var i = 0; i < tags.length; i++) {
                    console.log('tagnumber ' + i);

                    console.log(tags[i].name);
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