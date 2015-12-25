angular.module('starter')

.factory("Rooms", function($firebaseArray) {

  var itemsRef = new Firebase("https://snaproom.firebaseio.com/rooms");

  var geoItems = new GeoFire(itemsRef);

  return $firebaseArray(itemsRef);
});