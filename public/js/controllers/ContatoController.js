// injetamos ContatoService
angular.module('contatooh').controller('ContatoController', 
	function($scope, $routeParams, Contato){
		$scope.mensagem = {texto: '',
							sucesso: ''};
		
		if($routeParams.contatoId) {
			
			Contato.get({id: $routeParams.contatoId},
				//sucesso
				function(contato) {
					$scope.contato = contato;
					$scope.mensagem = {};
				},
				//erro
				function(erro) {
					$scope.mensagem = {
						texto: 'Não foi possível obter o contato.',
						sucesso: '0'
					};
					console.log(erro);
				}
			);
		}else {
			$scope.contato = new Contato();
		}
		
		$scope.salva = function() {
			$scope.contato.$save()
				.then(function() {
					$scope.mensagem = {texto: 'Salvo com sucesso',
									   sucesso: '1'};
					// limpa o formulário
					$scope.contato = new Contato();
				})
			.catch(function(erro) {
				$scope.mensagem = {texto: 'Não foi possível salvar',
								   sucesso: '0'};
			});
		};
		
		//busca todos os contatos
		Contato.query(function(contatos) {
			$scope.contatos = contatos;
		});
	}
);