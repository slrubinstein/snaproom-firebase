angular.module('starter')

.controller('HomeCtrl', function(Rooms, GeolocationService, GeoFireService) {

  var vm = this;

  vm.addRoom = addRoom;
  vm.rooms = Rooms;
  vm.locationLoaded = false;

  init();

  function init() {
    GeolocationService.getUserPosition()
    .then(function(position) {
      findLocalRooms();
      vm.locationLoaded = true;
    });
  }

  function addRoom() {
    var name = prompt("Provide a name for your room:");
    var latLon;

    if (name) {
      latLon = GeolocationService.getLatLon();
      vm.rooms.$add({
        "name": name
      }).then(function(ref) {
        addGeolocation(ref);
      }, function(error) {
        console.error(error);
      });
    }
  }

  function addGeolocation(ref) {
    var latLon = GeolocationService.getLatLon();
    GeoFireService.set(ref.key(), latLon)
    .then(function() {
      // success
    }, function(error) {
      console.error(error);
    });
  }

  function findLocalRooms() {
    var latLon = GeolocationService.getLatLon();
    var geoQuery = GeoFireService.query({
      center: latLon,
      radius: 10
    });

    var onReadyRegistration = geoQuery.on("ready", function() {
      console.log("GeoQuery has loaded and fired all other events for initial data");
    });

    var onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, location, distance) {
      console.log(key + " entered query at " + location + " (" + distance + " km from center)");
    });

    var onKeyExitedRegistration = geoQuery.on("key_exited", function(key, location, distance) {
      console.log(key + " exited query to " + location + " (" + distance + " km from center)");
    });

    var onKeyMovedRegistration = geoQuery.on("key_moved", function(key, location, distance) {
      console.log(key + " moved within query to " + location + " (" + distance + " km from center)");
    });
  }
});
