angular.module('geolocation')

.factory('GeoFireService', function($firebaseArray) {

  var firebaseRef = new Firebase('https://snaproom.firebaseio.com/');

  var geoFire = new GeoFire(firebaseRef);

  return geoFire;
});