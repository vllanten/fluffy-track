(function () {
  'use strict';

  angular
    .module('fuse')
    .config(config)
    .config(function (localStorageServiceProvider) {
      localStorageServiceProvider
        .setPrefix('fluffly-track');
    });


  /** @ngInject */
  function config(uiGmapGoogleMapApiProvider, $translateProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyDWGPWlGjDh3wrwKTKud05kuC0afxjS_4g',
      v        : '3.exp',
      libraries: 'weather,geometry,visualization'
    });

    // angular-translate configuration
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '{part}/i18n/{lang}.json'
    });
    $translateProvider.preferredLanguage('es');
    $translateProvider.useSanitizeValueStrategy('sanitize');
  }

})();
