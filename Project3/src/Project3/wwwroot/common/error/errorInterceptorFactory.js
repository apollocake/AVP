

//errorinterceptorfactory

(function () {
    'use strict';

    angular
        .module('app')
        .factory('myHttpInterceptor', function ($q, myToastr) {
            return {
                'responseError': function (rejection) {
                    // do something on error
                    //myToastr.warning('An error has occurred.');
                    return $q.reject(rejection);
                }
            };
        });
})();
