//Protege API REST de acesso não autorizado
module.exports = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status('401').json('Não autorizado');
	}
};