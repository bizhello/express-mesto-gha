const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getCards, postCards, deleteCards, likeCard, dislikeCard,
} = require('../controller/cardControllers');

const cardRoutes = express.Router();

cardRoutes.get('/', getCards);

cardRoutes.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*/),
  }).unknown(true),
}), postCards);

cardRoutes.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum(),
  }),
}), deleteCards);

cardRoutes.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum(),
  }),
}), likeCard);

cardRoutes.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum(),
  }),
}), dislikeCard);

module.exports = {
  cardRoutes,
};
