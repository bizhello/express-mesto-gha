const express = require('express');
const bodyParser = require('body-parser');
const { userRoutes } = require('./userRoutes');
const { cardRoutes } = require('./cardRoutes');
const { route } = require('./route');

const routes = express.Router();

routes.use(bodyParser.json());
routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);
routes.use('*', route);

module.exports = {
  routes,
};
