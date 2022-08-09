const express = require('express');
const bodyParser = require('body-parser');
const { userRoutes } = require('./userRoutes');
const { cardRoutes } = require('./cardRoutes');

const routes = express.Router();

routes.use(bodyParser.json());
routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

module.exports = {
  routes,
};
