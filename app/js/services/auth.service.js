(function() {

  angular
    .module('App')
    .service('$authService', $authService);

  $authService.$inject = [];

  function $authService() {
    var self = this;
    var currentUser = null;

    self.findUser = function(credentials) {
      console.log(credentials);
      return new Promise(function(resolve, reject) {
        if(credentials.dni !== 1234 || credentials.password !== "1234"){
          reject();
        }
        setTimeout(function() {
          resolve({
            status: 200,
            data: {
            firstname: "Emi",
            lastname: "Gerez",
            dni: "33439203",
            vehicles: [{
              deviceId: 1234
            }]
          }});
        }, 1000);
      });
    };

    self.getCurrentUser = function() {
      return self.currentUser;
    };

    self.setCurrentUser = function(user) {
      return (self.currentUser = user);
    };
  }

})();