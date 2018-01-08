(function ()
{
    'use strict';

    angular
        .module('app.track')
        .controller('TrackController', TrackController);

    /** @ngInject */
    function TrackController(api, TrackData)
    {
        var vm = this;

        api.gps.grupos({},
          function (response) {

          },
          function (error) {
          }
        );

        api.gps.dispositivos({},
          function (response) {

          },
          function (error) {
          }
        );

    }
})();
