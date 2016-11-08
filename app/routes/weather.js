var verificaAutenticacao = require('../../config/auth');
module.exports = function(app){
	var controller = app.controllers.weather;
	app.route('/weather')
		.get(verificaAutenticacao, controller.pesquisar);
		
	app.route('/weather/:id')
		.get(verificaAutenticacao, controller.pesquisar);
		
};