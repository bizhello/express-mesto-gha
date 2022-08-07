import { Router } from 'express';
import {
  getCards, postCards, deleteCards, likeCard, dislikeCard,
} from '../controller/cardControllers.js';

const cardRoutes = Router();

cardRoutes.get('/', getCards);
cardRoutes.post('/', postCards);
cardRoutes.delete('/:cardId', deleteCards);
cardRoutes.put('/:cardId/likes', likeCard);
cardRoutes.delete('/:cardId/likes', dislikeCard);

export default cardRoutes;
