const express = require('express');
const { celebrate, Joi } = require('celebrate');

const authRoutes = express.Router();
const {
  createUser, login,
} = require('../controller/authControllers');

authRoutes.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['ru', 'com', 'net'] } }),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*/),
  }).unknown(true),
}), createUser);

authRoutes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['ru', 'com', 'net'] } }),
    password: Joi.string().required(),
  }),
}), login);

module.exports = {
  authRoutes,
};
