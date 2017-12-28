(function ()
{
    'use strict';

    angular
        .module('app.track')
        .controller('TrackController', TrackController);

    /** @ngInject */
    function TrackController(api, TrackData)
    {
        var vm = this;

        api.sample.users.query({},
          function(response){
            //vm.users = response;
          },
          function(error){}
        )

        // Data
        vm.helloText = TrackData.data.helloText;

        // Methods

        //////////
    }
})();
