const express = require('express');
const cardRoutes = express.Router();

const cardControllers = require('./../controller/cardControllers');

cardRoutes.get('/', cardControllers.getCards);
cardRoutes.post('/', cardControllers.postCards);
cardRoutes.delete('/:cardId', cardControllers.deleteCards);
cardRoutes.put('/:cardId/likes', cardControllers.putCardsLike);
cardRoutes.delete('/:cardId/likes', cardControllers.deleteCardsLike);

module.exports = {
  cardRoutes,
}
