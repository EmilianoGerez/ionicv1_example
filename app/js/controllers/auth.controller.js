(function () {

  angular
    .module('App')
    .controller('AuthCtrl', AuthCtrl);

  AuthCtrl.$inject = ['$scope', '$state', '$authService', '$ionicPopup'];

  function AuthCtrl($scope, $state, $authService, $ionicPopup) {
    var vm = $scope;
    vm.spinner = false;
    vm.loginError = "";

    vm.credentials = {
      dni: '',
      password: ''
    };
    vm.credentialsInitial = angular.copy(vm.credentials);

    vm.login = function () {
      vm.spinner = true;
      $authService.findUser(vm.credentials)
        .then(function (response) {
          vm.spinner = false;
          $authService.setCurrentUser(response.data);
          vm.$apply();
          $state.go('private.dashboard');
          // local storage
        })
        .catch(function (error) {
          vm.spinner = false;

          var alertPopup = $ionicPopup.alert({
            title: 'DNI o Contraseña invalido',
            template: 'Ingresa tus credenciales correctamente'
          });

          alertPopup.then(function (res) {
            vm.credentials = angular.copy(vm.credentialsInitial);
          });
          vm.$apply();
          console.log(error);
        });
    };
  }

})();
