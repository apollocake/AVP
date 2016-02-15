(function () {
    'use strict';

    angular
        .module('project2')
        .controller('contactController', contactController);

    //contactController.$inject = ['$location']; 

    function contactController($scope) {
        // function to submit the form after all validation has occurred            
        $scope.submitForm = function () {

            // check to make sure the form is completely valid
            if ($scope.userForm.$valid) {
                alert('our form is amazing');
            }

        };
    }
})();
