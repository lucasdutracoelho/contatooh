//padrão de projeto PageObject (http://martinfowler.com/bliki/PageObject.html)
var contatoPage = function() {
	this.visitar = function() {
		browser.get('http://192.168.33.10:3000/#/contato');
	};

	this.digitarNome = function(nome) {
		element(by.model('contato.nome')).sendKeys(nome);
	};

	this.digitarEmail = function(email) {
		element(by.model('contato.email')).sendKeys(email);
	};

	this.salvar = function() {
		element(by.css('.btn-primary')).click();
	};

	this.obterMensagem = function() {
		return element(by.binding('mensagem.texto')).getText()
	};

	this.selecionarPrimeiraEmergenciaDaLista = function() {
		element(by.css('option[value="0"]')).click();
	};

}

module.exports = contatoPage;