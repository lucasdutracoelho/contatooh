angular.module('contatooh').factory('Weather',
	function($resource) {
		return $resource('/weather/:id', {}, {
			queryWeather: {
		          method: 'GET',
		          isArray: false
		          //headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			    }
		});
	}
		/*return $resource('http://ricardojdn-test.apigee.net/weatherrest/cityweatherbyzip?ZIP=07030',
		      {
		       	mode: 'jsonp'
		      },
		      {
		        queryWeather: {
		          method: 'GET',
		          isArray: false,
		          headers: { 'X-Requested-With': 'undefined' }
			    }
			  }
			);
		}*/
);