// injetamos ContatoService
angular.module('contatooh').controller('WeatherController', 
	function($scope, $routeParams, $http, Weather){
		$scope.weather = {};
		$scope.mensagem = {texto: '',
							sucesso: ''};

		$scope.pesquisar = function() {
			console.log($scope.zip);

			var promise = Weather.queryWeather({id: $scope.zip}).$promise;

			promise.then(function onSuccess(response) {
				$scope.weather = response.GetCityWeatherByZIPResponse.GetCityWeatherByZIPResult;
			},
			function onFail(response) {
			    // handle failure
			     $scope.mensagem = {
					texto: 'Não foi possível obter weather.',
					sucesso: '0'
				};
				console.log(response);
			});
	}
});