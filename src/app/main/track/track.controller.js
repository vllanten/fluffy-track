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

    vm.minDate = today;
    vm.maxDate = today;

    vm.changeDate = function(){
      vm.minDate = new Date(vm.dateInicio)
    }

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

      var final = new Date(vm.dateFin.valueOf() + vm.dateFin.getTimezoneOffset() * 60000);

      var rango_fin = moment(final).format('YYYY-MM-DD HH:mm:ss');

      if (vm.tipo_busqueda == 2 ){
        //búsqueda por fechas
        var rango_inicio = moment(vm.dateInicio).format('YYYY-MM-DD') + " 00:00:00";
      }else{
        //búsqueda por intervalo
        //ahora
        var _now = new Date();
        //ahora GTM 0
        var now = new Date(_now.valueOf() + _now.getTimezoneOffset() * 60000);
        //ahora GTM 0 - el intervalo
        var rango_inicio = moment(now).subtract(vm.selectedIntervalo, 'minutes').format('YYYY-MM-DD HH:mm:ss');
      }

      console.log(rango_inicio)
      var query = {
        id_dispositivo: vm.selectedDispositivos ,
        fecha_ini: rango_inicio,
        fecha_fin:  rango_fin,
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
      // console.log(vm.maps.map.center);
      // console.log(vm.maps.map.zoom);
      getPuntos(vm.maps.map.center, vm.maps.map.zoom)
      vm.marcadores = [];
    }

    getDispositivos()

  }
})();
