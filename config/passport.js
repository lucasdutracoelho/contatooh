var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');

const CLIENT_ID = 'b1891a7ec7b7f6e20632';
const CLIENT_SECRET = 'aa3378fe5127b0be1d2a6fe136452b9cfa5801c2';
const CALLBACK_URL = 'http://192.168.33.10:3000/auth/github/callback';

module.exports = function() {

	//Recupera o model Contato
	var Usuario = mongoose.model('Usuario');

	passport.use(new GitHubStrategy(
		{
			clientID: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
			callbackURL: CALLBACK_URL
		}, 
		function(accessToken, refreshToken, profile, done) {
		
			Usuario.findOrCreate(
				{ "login" : profile.username},
				{ "nome" : profile.username},
				function(erro, usuario) {
					if(erro){
						console.log(erro);
						return done(erro);
					}
				return done(null, usuario);
			});
		})
	);

	/*
	Chamado apenas UMA vez e recebe o usuário do nosso
	banco disponibilizado pelo callback da estratégia de
	autenticação. Realizará a serialização apenas do
	ObjectId do usuário na sessão.
	*/
	passport.serializeUser(function(usuario, done) {
		done(null, usuario._id);
	});

	// Recebe o ObjectId do usuário armazenado na sessão
	// Chamado a CADA requisição
	passport.deserializeUser(function(id, done) {
		Usuario.findById(id).exec()
		.then(function(usuario) {
			done(null, usuario);
		});
	});
};