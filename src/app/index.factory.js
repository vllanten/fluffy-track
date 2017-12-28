(function ()
{
    'use strict';

    angular
      .module('fuse')
      .factory('loginInterceptor', loginInterceptor)
      .config(function($httpProvider) {
        $httpProvider.interceptors.push('loginInterceptor');
      })

    function loginInterceptor($q, $location) {
      return {
        request: function(config) {
          //TODO rescatar tokenaccess desde localStorage
          config.headers['tokenaccess'] = 'lalalalala';
          return config;
        },
        requestError: function(config) {
          return config;
        },
        response: function(res) {
          //TODO guardar tokenaccess en localStorage
          return res;
        },
        responseError: function(res) {
          if (res.status === 401) {
            var currentPath = $location.path();
            $location.path('/login').search({'returnTo': currentPath});
            return $q.reject(res);
          }
          return res;
        }
      }
    }

})();
