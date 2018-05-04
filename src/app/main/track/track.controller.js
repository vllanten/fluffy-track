(function () {
  'use strict';

  angular
    .module('app.track')
    .controller('TrackController', TrackController);

  /** @ngInject */
  function TrackController(api, TrackData, uiGmapGoogleMapApi) {
    var vm = this;
    vm.marcadores = [];

    vm.dispositivos = [];
    vm.selectedDispositivos = [];

    function getGrupos() {
      api.gps.grupos({},
        function (response) {
        },
        function (error) {
        }
      );
    };

    function getDispositivos() {
      api.gps.dispositivos({},
        function (response) {
          vm.dispositivos = response.message.data
        },
        function (error) {
        }
      );
    };

    function getPuntos() {

      api.gps.puntos({ limit: 10, id_dispositivo: 2 },
        function (response) {
          var i = 0;

          response.message.data.forEach(function (element) {
            vm.marcadores.push({
              id: i,
              coords: {
                latitude: element.latitud,
                longitude: element.longitud
              },
              show: false,
              labels: {
                fecha: element.fecha
              },
            });
            i++;
          });

          uiGmapGoogleMapApi.then(function () {
            vm.maps.map = {
              "center": {
                "latitude": -33.454838,
                "longitude": -70.6827659
              },
              "zoom": 12,
              "options": {
                "minZoom": 3,
                "scrollwheel": false
              },
              "markers": vm.marcadores
            };
          });

        },
        function (error) {
        }
      );
    };

    vm.maps = {
      title: "Puntos de control"
    };

    uiGmapGoogleMapApi.then(function () {
      vm.maps.map = {
        "center": {
          "latitude": -33.454838,
          "longitude": -70.6827659
        },
        "zoom": 12,
        "options": {
          "minZoom": 3,
          "scrollwheel": false
        },
        "markers": vm.marcadores
      };
    });

    vm.refreshWidget = function () {
      getPuntos()
      console.log("aca");
      vm.marcadores = [];
    }

    getDispositivos()

  }
})();
