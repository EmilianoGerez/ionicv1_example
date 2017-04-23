(function () {

  angular
    .module('App')
    .controller('MapCtrl', MapCtrl);

  MapCtrl.$inject = ['$scope', '$state', '$cordovaGeolocation', '$ionicPlatform', '$ionicLoading'];

  function MapCtrl($scope, $state, $cordovaGeolocation, $ionicPlatform, $ionicLoading) {

    $ionicPlatform.ready(function () {

      $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
      });

      var posOptions = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      };

      $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        var myLatlng = new google.maps.LatLng(lat, long);

        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        $scope.map = map;
        $ionicLoading.hide();

      }, function (err) {
        $ionicLoading.hide();
        console.log(err);
      });
    });

  }
})();
