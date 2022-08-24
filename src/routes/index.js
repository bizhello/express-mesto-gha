const express = require('express');
const bodyParser = require('body-parser');
const { userRoutes } = require('./userRoutes');
const { cardRoutes } = require('./cardRoutes');
const { authRoutes } = require('./authRoutes');
const { route } = require('./route');
const auth = require('../middlewares/auth');

const routes = express.Router();

routes.use(bodyParser.json());
routes.use('/', authRoutes);
routes.use(auth);
routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);
routes.use('*', route);

module.exports = {
  routes,
};
