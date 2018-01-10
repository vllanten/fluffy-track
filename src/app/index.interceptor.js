(function () {
  'use strict';

  angular
    .module('fuse')
    .factory('loginInterceptor', loginInterceptor)
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('loginInterceptor');
    })

  function loginInterceptor($q, $location, localStorageService, configuracionesGlobales) {
    return {
      request: function (config) {
        config.headers['tokenaccess'] = localStorageService.get("tokenaccess");
        return config;
      },
      requestError: function (config) {
        return config;
      },
      response: function (res) {
        if(String(res.config.url).includes(configuracionesGlobales.baseUrl)){
          if(res.headers("tokenaccess")){
            localStorageService.set("tokenaccess", res.headers("tokenaccess"));
          }
        }
        return res;
      },
      responseError: function (res) {
        if (res.status === 401) {
          $location.path('/login');
          return $q.reject(res);
        }
        return res;
      }
    }
  }

})();
