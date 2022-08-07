import Card from '../models/cardModels.js';
import User from '../models/userModels.js';
import errors from '../../utils/errors.js';

export async function getCards(req, res) {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    res.status(500);
    res.send(errors.server);
  }
}

export async function postCards(req, res) {
  try {
    const card = new Card(req.body);
    card.owner = req.user._id;
    await card.save();
    res.send(card);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400);
      res.send(errors.user);
    } else {
      res.status(500);
      res.send(errors.server);
    }
  }
}

export async function deleteCards(req, res) {
  try {
    if (await Card.findById(req.params.cardId)) {
      await Card.findByIdAndRemove(req.params.cardId);
      res.send('DELETE CARD');
    } else {
      res.status(404);
      res.send(errors.url);
    }
  } catch (error) {
    res.status(500);
    res.send(errors.server);
  }
}

export async function likeCard(req, res) {
  try {
    const card = await Card.findById(req.params.cardId);
    const user = await User.findById(req.user._id);
    if (card) {
      await Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: user } },
        { new: true },
      );
      res.send('Лайк поставлен');
    } else {
      res.status(500);
      res.send(errors.server);
    }
  } catch (error) {
    res.status(400);
    res.send(errors.user);
  }
}

export async function dislikeCard(req, res) {
  try {
    const card = await Card.findById(req.params.cardId);
    const user = await User.findById(req.user._id);
    if (card) {
      await Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: user } },
        { new: true },
      );
      res.send('Лайк убран');
    } else {
      res.status(500);
      res.send(errors.server);
    }
  } catch (error) {
    res.status(400);
    res.send(errors.user);
  }
}
