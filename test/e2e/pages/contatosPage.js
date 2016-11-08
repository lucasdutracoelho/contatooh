var contatosPage = function() {

	this.visitar = function() {
		//previne erro de página NON Angular
		//browser.ignoreSynchronization = true;
		browser.get('http://192.168.33.10:3000/#/contatos');
		//verificar o HTML apresentado
		/*.then( function () {
		    return browser.getPageSource()
		    	.then( function (txt) {
				    console.log(txt);
				})
		});*/
	};

	this.obterUsuarioLogado = function(nome) {
		return element(by.id('usuario-logado')).getText();
	};

	this.obterTotalDeItensDaLista = function() {
		return element.all(by.repeater('contato in contatos')).count();
	};

	this.removerPrimeiroItemDaLista = function() {
		element(by.repeater('contato in contatos').row(0))
			.element(by.css('.btn'))
			.click();
	}
}
module.exports = contatosPage;
