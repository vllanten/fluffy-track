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

    var today = new Date();
    vm.dateInicio = today;
    vm.dateFin = today;

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

    function getPuntos(center, zoom) {

      var inicial = ""
      var final = new Date(vm.dateFin.valueOf() + vm.dateFin.getTimezoneOffset() * 60000);

      var query = {
        // limit: 10,
        id_dispositivo: vm.selectedDispositivos ,
        fecha_ini: moment(vm.dateInicio).format('YYYY-MM-DD'),
        fecha_fin:  moment(final).format('YYYY-MM-DD HH:mm:ss'),
      };
      api.gps.puntos(query,
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
              "center": center,
              "zoom": zoom,
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
      console.log(vm.maps.map.center);
      console.log(vm.maps.map.zoom);
      getPuntos(vm.maps.map.center, vm.maps.map.zoom)
      vm.marcadores = [];
    }

    getDispositivos()

  }
})();
