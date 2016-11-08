module.exports = function(app){
	var controller = {};

	/*
		O Passport convenientemente disponibiliza na requisição a função
		isAutenticated, que nos permite saber em nossos controllers se o usuário
		está autenticado ou não.
	*/
	controller.login = function(req, res, next) {
		//console.log('Passei pela função de Login');
		if(req.isAuthenticated()) {
			// permite que outras rotas sejam processadas
			return next();
		} else {
			// renderiza auth.ejs
			res.render("auth");
		}
	};

	controller.logout = function(req, res) {
		req.logOut(); //exposto pelo Passport
		res.redirect('/');
	};


	return controller;
}