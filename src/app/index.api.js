(function () {
  'use strict';

  angular
    .module('fuse')
    .factory('api', apiService);

  function apiService($resource, configuracionesGlobales) {

    var api = {};

    api.gps = $resource(configuracionesGlobales.baseUrl, {}, {
      login: {
        url: configuracionesGlobales.baseUrl + '/login',
        method: 'POST'
      },
      grupos: {
        url: configuracionesGlobales.baseUrl + '/grupos',
        method: 'GET'
      },
      dispositivos: {
        url: configuracionesGlobales.baseUrl + '/dispositivos',
        method: 'GET'
      },
      puntos: {
        url: configuracionesGlobales.baseUrl + '/puntos',
        method: 'GET'
      },


    });

    return api;

  }

})();
