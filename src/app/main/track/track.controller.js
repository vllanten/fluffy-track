(function () {
  'use strict';

  angular
    .module('app.track')
    .controller('TrackController', TrackController);

  /** @ngInject */
  function TrackController(api, TrackData, uiGmapGoogleMapApi) {
    var vm = this;
    var marcadores = [];

    function getGrupos(){
      api.gps.grupos({},
        function (response) {
  
        },
        function (error) {
        }
      );
    };

    function getDispositivos  (){
      api.gps.dispositivos({},
        function (response) {
  
        },
        function (error) {
        }
      );
    };

    function getPuntos  (){

      api.gps.puntos({ limit: 10, id_dispositivo: 2 },
        function (response) {
          var i = 0;
          response.message.data.forEach(function(element){
  
            marcadores.push({
              id: i,
              coords: {
                latitude: element.latitud,
                longitude: element.longitud
              },
              show : true,
              labels: {
                fecha : element.fecha
              },
            });
            i++;
          });
  
          uiGmapGoogleMapApi.then(function () {
            vm.maps.map = {
              "center": {
                "latitude": -33.4320525,
                "longitude": -70.6827659
              },
              "zoom": 12,
              "options": {
                "minZoom": 3,
                "scrollwheel": false
              },
              "markers": marcadores
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

    getGrupos()
    getDispositivos()
    getPuntos()

  }
})();
