const express = require('express');
const {
  getCards, postCards, deleteCards, likeCard, dislikeCard,
} = require('../controller/cardControllers');

const cardRoutes = express.Router();

cardRoutes.get('/', getCards);
cardRoutes.post('/', postCards);
cardRoutes.delete('/:cardId', deleteCards);
cardRoutes.put('/:cardId/likes', likeCard);
cardRoutes.delete('/:cardId/likes', dislikeCard);

module.exports = {
  cardRoutes,
};
