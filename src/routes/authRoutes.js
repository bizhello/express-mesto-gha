const express = require('express');

const authRoutes = express.Router();
const {
  createUser, login,
} = require('../controller/authControllers');

authRoutes.post('/signup', createUser);
authRoutes.post('/signin', login);

module.exports = {
  authRoutes,
};
