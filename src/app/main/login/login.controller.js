(function ()
{
    'use strict';

    angular
        .module('app.login')
        .controller('LoginV2Controller', LoginV2Controller);

    function LoginV2Controller(api)
    {
        var vm = this;
        vm.form = {};
        vm.identificarse = function(){
        mv = false;
          var parametros = {
            username:vm.form.email,
            password:vm.form.password
          }

          api.gps.login(parametros,
            function(response){
              console.log(response.message);
            },
            function(error){
              console.log(error)
            }
          );
        }
    }
})();
