// injetamos ContatoService
angular.module('contatooh').controller('ContatosController', 
function($scope, Contato){
	$scope.contatos = [];
	$scope.mensagem = {texto: ''};
	
	function buscaContatos() {
		Contato.query(
			//sucesso
			function(contatos) {
				$scope.contatos = contatos;
				$scope.mensagem = {};
			},
			//error
			function(erro) {
				$scope.mensagem = {
					texto: 'Não foi possível obter a lista'
				};
				console.log(erro);
			}
		);
	}
	buscaContatos();
	
	$scope.filtro = '';
	
	$scope.remove = function(contato) {
		Contato.delete({id: contato._id},
			//function sucesso
			buscaContatos,
			//function erro
			function(erro) {
				$scope.mensagem = {
					texto: 'Não foi possível remover o contato'
				};
				console.log(erro);
			}
		);
	};
});