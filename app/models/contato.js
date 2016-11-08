//Model Contato
//Definindo propriedades para garantir integridade
var mongoose = require('mongoose');
module.exports = function() {
	var schema = mongoose.Schema({
		nome: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			//indica que o email é unico
			index: {
				unique: true
			}
		},
		//autorelacionamento
		emergencia: {
			type: mongoose.Schema.ObjectId,
			ref: 'Contato'
		}
	});
	return mongoose.model('Contato', schema);
};