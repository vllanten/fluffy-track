(function ()
{
    'use strict';

    angular
        .module('app.track', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.track', {
                url    : '/track',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/track/track.html',
                        controller : 'TrackController as vm'
                    }
                },
                resolve: {
                    TrackData: function (msApi)
                    {
                        return msApi.resolve('track@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/track');

        // Api
        msApiProvider.register('track', ['app/data/track/track.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'TRACK',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.track', {
            title    : 'Track',
            icon     : 'icon-tile-four',
            state    : 'app.track',
            stateParams: {
                'param1': 'page'
             },
            translate: 'TRACK.TRACK_NAV',
            weight   : 1
        });
    }
})();
