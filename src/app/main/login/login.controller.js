(function () {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginV2Controller', LoginV2Controller);

  function LoginV2Controller(api,  $location) {


    var vm = this;
    vm.form = {};
    vm.identificarse = function () {

      var parametros = {
        username: vm.form.email,
        password: vm.form.password
      }

      api.gps.login(parametros,
        function (response) {
          if (response.success == true) {
            $location.path('/');
          }
        },
        function (error) {
          console.log(error)
        }
      );
    }
  }
})();
