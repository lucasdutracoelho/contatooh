exports.config = {

	specs: ['../test/e2e/**/*.js'],

	onPrepare: function() {
		browser.driver.get('http://192.168.33.10:3000');
		browser.driver.findElement(by.id('entrar')).click();
		browser.driver.findElement(by.id('login_field')).sendKeys('lucasdutra@ymail.com');
		browser.driver.findElement(by.id('password')).sendKeys('lucke179355');
		browser.driver.findElement(by.name('commit')).click();
	},

	seleniumAddress: 'http://localhost:4444/wd/hub',

	capabilities: {
	  'browserName': 'phantomjs',
	  'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
	}
};