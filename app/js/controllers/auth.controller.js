(function() {

  angular
    .module('App')
    .controller('AuthCtrl', AuthCtrl);

  AuthCtrl.$inject = ['$scope', '$state', '$authService'];

  function AuthCtrl($scope, $state, $authService) {
    var vm = $scope;
    vm.spinner = false;

    vm.credentials = {
      dni: '',
      password: ''
    }

    vm.login = function() {
      vm.spinner = true;
      $authService
        .findUser(vm.credentials)
        .then(function(response) {
          vm.spinner = false;
          $authService.setCurrentUser(response);
          vm.$apply();
          $state.go('private.dashboard');
          // local storage
        })
        .catch(function(error) {
          vm.spinner = false;
          console.log(error);
        });
    }
  }

})();