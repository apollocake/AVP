(function () {
    'use strict';

    angular.module('app', [
        // Angular modules 
        'ui.bootstrap',
        // 3rd Party Modules
        'ui.bootstrap.showErrors'
    ]).directive('myEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.myEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });
})();
