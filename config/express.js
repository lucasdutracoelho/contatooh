var express = require('express');
//DI
var load = require('express-load');
//Requisicoes http (PUT, DELETE)
var bodyParser = require('body-parser');
//cookie
var cookieParser = require('cookie-parser');
//sessão
var session = require('express-session');
//Autenticação
var passport = require('passport');
//Segurança
var helmet = require('helmet');

//cors = require('cors')

module.exports = function(app){
	//configura a porta
	app.set('port', 3000);

	//middleware
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(require('method-override')())
	//app.use(cors());

	app.use(cookieParser());
	app.use(session({ 
			//o cookie de sessão é assinado com este segredo para evitar adulteração
			secret: 'assinatura',
			//garante que as informações da sessão serão acessíveis através de cookies a cada requisição.
			resave: true,
			//essa opção soluciona problemas que envolvem a requisição de uma permissão antes de atribuir um cookie
			saveUninitialized: true
		}
	));
	app.use(passport.initialize());
	app.use(passport.session());

	//fornecemos uma informação falsa através do middleware, indicando qual tecnologia esta sendo utilizada
	//pode ser utilizado app.disable('x-powered-by') do Express
	app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
	//evitamos que nossas páginas sejam referenciadas por <frame> ou <iframe>.
	app.use(helmet.frameguard({ action: 'deny' }));
	//protecao cross-site scripting IE9+ Chrome
	app.use(helmet.xssFilter());
	//Não permitir que o browser infira o MIME Type
	app.use(helmet.noSniff());
	app.use(helmet());

	//view engine
	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	//foi necessario o parametro 'cwd', pois precisamos que ele considere a pasta contatooh/app
	load('models', {cwd: 'app'})
	.then('controllers')
	.then('routes/auth.js')
	.then('routes')
	.into(app);
	
	app.use(express.static('./public'));


	// se nenhum rota atender, direciona para página 404
	app.get('*', function(req, res) {
		res.status(404).render('404');
	});
	return app;
}