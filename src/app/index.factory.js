(function () {
  'use Stric';

  function configuracionesGlobales() {

    var config = {};

    config.baseUrl = "http://104.131.187.65:1880";

    return config;

  }

  angular
    .module('fuse')
    .factory('configuracionesGlobales', configuracionesGlobales);

})();
