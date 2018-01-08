(function () {
  'use Stric';

  function configuracionesGlobales() {

    var config = {};

    config.baseUrl = "http://54.148.196.216:1880";

    return config;

  }

  angular
    .module('fuse')
    .factory('configuracionesGlobales', configuracionesGlobales);

})();
