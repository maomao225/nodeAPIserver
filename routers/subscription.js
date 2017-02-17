const express = require('express');
const subscription = express.Router();

function createRoute(controller) {

  subscription.get('/', controller.index);
  subscription.post('/', controller.update);
  subscription.delete('/', controller.remove);

  return subscription;
}

module.exports = createRoute;
