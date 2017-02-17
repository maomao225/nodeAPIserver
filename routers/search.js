const express = require('express');
const subscription = express.Router();

function createRoute(controller) {

  subscription.post('/editorial', controller.editorial);
  // subscription.post('/group', controller.group);
  // subscription.post('/topic', controller.topic);

  return subscription;
}

module.exports = createRoute;
