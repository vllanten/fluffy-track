(function ()
{
    'use strict';

    angular
        .module('app.login', [])
        .config(config);

    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.pages_auth_login', {
            url      : '/login',
            views    : {
                'main@'                          : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.pages_auth_login': {
                    templateUrl: 'app/main/login/login.html',
                    controller : 'LoginV2Controller as vm'
                }
            },
            bodyClass: 'login'
        });

        $translatePartialLoaderProvider.addPart('app/main/login');
    }

})();
