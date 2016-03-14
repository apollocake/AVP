(function () {
    'use strict';

    angular.module('app', [
        // Angular modules 
        'ui.bootstrap',
        // Custom modules 
        'ui.router',
        // 3rd Party Modules
        'ui.bootstrap.showErrors'
    ])

    .controller('appController', function ($rootScope, $state, myToastr) {
        //on is an event listener (name, action)
        //stateChangeError is built in ui router transition for states
        $rootScope.$on("$stateChangeError", console.log.bind(console));
        $rootScope.$on("$stateChangeError", function () {
            $state.go('error');
        });
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams, options) {
                //myToastr.warning('Starting state ' + toState.name);
            });
        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                //myToastr.warning('At state ' + toState.name + ' from ' + fromState.name);
            });

    })
        //registering toastr warning with provide service via decorator
        .config(function ($provide) {
            //decorator(nameOfServiceToDecorate, function that encapsulates new behavior must return func|string)
            //delegate is an approved local injection arg
            $provide.decorator('$exceptionHandler', function extendExceptionHandler($delegate, myToastr) {
                return function (exception, cause) {
                    //where the actual decorating happens with
                    $delegate(exception, cause);

                    /**
                     * Could add the error to a service's collection,
                     * add errors to $rootScope, log errors to remote web server,
                     * or log locally. Or throw hard. It is entirely up to you.
                     * throw exception;
                     */
                    //myToastr.warning(exception.message);
                };
            });
        });
})();
