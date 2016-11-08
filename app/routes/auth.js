//Autenticação
var passport = require('passport');
module.exports = function(app) {
	var controller = app.controllers.auth;


	/*
		redirecionará o usuário para a página
		de login do GitHub enviando por baixo dos panos o CLIENT ID da
		aplicação. Utilizamos como controller o retorno da função
		passport.authenticate(‘github’), que saberá lidar com a requisição.
	*/
	app.get('/auth/github', passport.authenticate('github'));

	/*
		Possui o mesmo identificador que foi cadastrado como Authorization callback URL no
		GitHub. Quando o usuário se logar, o GitHub chamará a rota passando o
		CÓDIGO DE AUTORIZAÇÃO. Com o código recebido, o Passport se comunicará
		por baixo dos panos como SERVIDORDE AUTENTICAÇÃO que
		protege o profile do usuário no GitHub, solicitando o CONSENTIMENTO
		DE AUTORIZAÇÃO para daí acessar o profile. Se a autenticação for bem sucedida,
		o usuário será direcionando para nossa aplicação
	*/
	app.get('/auth/github/callback',
		passport.authenticate('github', {
			successRedirect: '/'
		}
	));

	app.get('/', controller.login);

	app.get('/logout', controller.logout);
}