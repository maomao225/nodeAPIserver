const express = require('express');
const login = express.Router();

function createRoute(controller) {

	login.post('/submit', controller.submit);

	login.post('/sendMobileCode', controller.sendMobileCode);

	login.post('/sendEmailCode', controller.sendEmailCode);
	
	login.post('/rePassword', controller.rePassword);

	login.post('/findPassword', controller.findPassword);

	login.post('/register', controller.register);

 	login.get('/userIsExist', controller.userIsExist);

 	login.get('/logout', controller.logout);

  return login;
}

module.exports = createRoute;


