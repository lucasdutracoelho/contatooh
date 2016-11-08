module.exports = function(app) {
	//Essa informação sempre estará disponível por causa do
	//processo de desserialização do usuário da sessão realizado pelo Passport.
	app.get('/', function(req, res) {
		res.render('index', { "usuarioLogado" : req.user.login});
	});
};