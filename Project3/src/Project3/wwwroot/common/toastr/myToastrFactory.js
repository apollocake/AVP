
//mytoastrfactory

(function () {
    'use strict';

    angular
        .module('app')
        .factory('myToastr', myToastrFactory);


    function myToastrFactory() {
        var warningCount = 0;

        var service = {
            warning: warning
        };

        return service;
        //warning is warning as warning is warning...
        function warning(message) {
            //warningCount = warningCount + 1;
            //actual toaster library call
            toastr.warning(message + warningCount);
        }
    }
})();
