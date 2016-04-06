//controller for user state
(function () {
    'use strict';

    angular
        .module('app')
        .controller('todoController', [
            '$scope',
            function ($scope) {
                console.log('im here');
                $scope.printScope = function () {
                    console.log('todo data');
                    console.log($scope.todoData);
                }
                
            }
        ]);
})();

