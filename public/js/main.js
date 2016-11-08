angular.module('contatooh', ['ngRoute', 'ngResource'])
	.config(function($routeProvider, $httpProvider, $resourceProvider){
		
		$routeProvider.when('/contatos', {
			templateUrl: 'partials/contatos.html',
			controller: 'ContatosController'
		});
		
		$routeProvider.when('/contato/:contatoId', {
			templateUrl: 'partials/contato.html',
			controller: 'ContatoController'
		});
		
		$routeProvider.when('/contato', {
			templateUrl: 'partials/contato.html',
			controller: 'ContatoController'
		});

		$routeProvider.when('/weather', {
			templateUrl: 'partials/weather.html',
			controller: 'WeatherController'
		});
		
		$routeProvider.otherwise({redirectTo: '/contatos'});
	});