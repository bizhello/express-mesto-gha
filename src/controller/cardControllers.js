const { Card } = require('../models/cardModels');
const { errors } = require('../../utils/errors');

async function getCards(req, res) {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    res.status(errors.server[0]);
    res.send(errors.server[1]);
  }
}

async function postCards(req, res) {
  try {
    const card = new Card(req.body);
    card.owner = req.user._id;
    card.validate((err) => {
      if (err) {
        res.status(errors.user[0]);
        res.send('Введены некорректные данные');
      } else {
        card.save();
        res.send(card);
      }
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(errors.user[0]);
      res.send(errors.user[1]);
    } else {
      res.status(errors.server[0]);
      res.send(errors.server[1]);
    }
  }
}

async function deleteCards(req, res) {
  try {
    if (await Card.findByIdAndRemove(req.params.cardId) !== null) {
      res.send('Карточка удалена');
    } else {
      res.status(errors.url[0]);
      res.send('Карточка была уже удалена');
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(errors.user[0]);
      res.send('id карточки задано неверно!');
    } else {
      res.status(errors.server[0]);
      res.send(errors.server[1]);
    }
  }
}

async function likeCard(req, res) {
  try {
    const card = await Card.findById(req.params.cardId);
    if (card) {
      await Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
      );
      res.send('Лайк поставлен');
    } else {
      res.status(errors.url[0]);
      res.send(errors.url[1]);
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(errors.url[0]);
      res.send('Карточка не найдена');
    } else {
      res.status(errors.server[0]);
      res.send(errors.server[1]);
    }
  }
}

async function dislikeCard(req, res) {
  try {
    const card = await Card.findById(req.params.cardId);
    if (card) {
      await Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
      );
      res.send('Лайк убран');
    } else {
      res.status(errors.url[0]);
      res.send(errors.url[1]);
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(errors.url[0]);
      res.send('Карточка не найдена');
    } else {
      res.status(errors.server[0]);
      res.send(errors.server[1]);
    }
  }
}

module.exports = {
  getCards,
  postCards,
  deleteCards,
  likeCard,
  dislikeCard,
};
