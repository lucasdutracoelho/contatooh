var request = require('request');
var API_URL = 'http://ricardojdn-test.apigee.net/weatherrest/cityweatherbyzip?ZIP=';
module.exports = function(app){
	var controller = {};

	
	controller.pesquisar = function(req, res) {
		
		var _id = req.params.id;
		console.log(_id);
		//console.log(req);

		request(API_URL+_id, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    //console.log(body); 
		    console.log(JSON.parse(body));
		    //res.setHeader('Content-Type', 'application/json');
		    //res.json(eval("(" + body + ')'));
		    res.json(JSON.parse(body));
		  }else{
		  	console.error(erro)
			res.status(500).json(erro);
		  }
		});
	};

	


	return controller;
}