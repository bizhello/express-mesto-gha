const express = require('express');
const bodyParser = require('body-parser');
const { userRoutes } = require('./userRoutes');
const { cardRoutes } = require('./cardRoutes');

const routes = express.Router();

routes.use(bodyParser.json());
routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);
routes.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = {
  routes,
};
