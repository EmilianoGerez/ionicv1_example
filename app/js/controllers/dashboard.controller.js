(function() {

  angular
    .module('App')
    .controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['$scope', '$state', '$authService'];

  function DashboardCtrl($scope, $state, $authService) {}
})();