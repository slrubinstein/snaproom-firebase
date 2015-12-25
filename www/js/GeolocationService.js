angular.module('geolocation', [])

.factory('GeolocationService', function($q) {
	
	var currentPosition = {};

	return {
		getLatLon: getLatLon,
		getUserPosition: getUserPosition
	}

	function getLatLon() {
		var lat = currentPosition.coords.latitude;
		var lon = currentPosition.coords.longitude;

		return [lat, lon];
	}

	function getUserPosition() {
		var deferred = $q.defer();

    navigator.geolocation.getCurrentPosition(function(position) {
      currentPosition = position;
      deferred.resolve(currentPosition);
    }, function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
	}

});