//query selector injection
var sanitize = require('mongo-sanitize');
module.exports = function(app){
	var controller = {};
	//models/contato.js
	var Contato = app.models.contato;
	
	controller.listaContatos = function(req, res){
		//utilizando para popular a referencia 'emergencia'
		var promise = Contato.find().populate('emergencia').exec()
		promise.then(
			//sucesso
			function(contatos) {
				res.json(contatos);
			},
			//erro
			function(erro) {
				console.error(erro)
				res.status(500).json(erro);
			}
		);
	};
	
	controller.obtemContato = function(req, res){
		var _id = req.params.id;
		var promise = Contato.findById(_id).exec();
		promise.then(
			//sucesso
			function(contato) {
				if (!contato) throw new Error("Contato não encontrado");
				res.json(contato)
			},
			//erro
			function(erro) {
				console.log(erro);
				res.status(404).json(erro)
			}
		);
	};
	
	controller.removeContato = function(req, res) {
		//remove "$" da
		var _id = sanitize(req.params.id);
		Contato.remove({"_id" : _id}).exec()
		.then(
			function() {
				res.end();
			},
			function(erro) {
				console.error(erro);
				res.status(500).json(erro);
			}
		);
}	;
	
	controller.salvaContato = function(req, res) {
		var _id = req.body._id;
		if(_id) {
			Contato.findByIdAndUpdate(_id, req.body).exec()
			.then(
				function(contato) {
					res.json(contato);
				},
				function(erro) {
					console.error(erro)
					res.status(500).json(erro);
				}
			);
		} else {
			Contato.create(req.body)
			.then(
				function(contato) {
					res.status(201).json(contato);
				},
				function(erro) {
					console.log(erro);
					res.status(500).json(erro);
				}
			);
		}
	};
	
	return controller;
}