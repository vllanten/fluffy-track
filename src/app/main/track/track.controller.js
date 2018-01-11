(function ()
{
    'use strict';

    angular
        .module('app.track')
        .controller('TrackController', TrackController);

    /** @ngInject */
    function TrackController(api, TrackData, uiGmapGoogleMapApi)
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

        vm.maps = {
          title: "este es el titulo"
        };

        api.gps.puntos({},
          function (response) {
            console.log(response)

          },
          function (error) {
          }
        );



        uiGmapGoogleMapApi.then(function ()
        {
            vm.maps.map = {
              "center": {
                  "latitude": -33.4320525,
                  "longitude": -70.6827659
              },
              "zoom": 10,
              "options": {
                  "minZoom": 3,
                  "scrollwheel": false
              },
              "markers": [
                  {
                      "id": 0,
                      "coords": {
                          "latitude": 47.285454,
                          "longitude": 20.887874
                      },
                      "show": false,
                      "sessions": "Sessions: 13"
                  },
              ]
          };
        });

    }
})();
