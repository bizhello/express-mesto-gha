const { Card } = require('../models/cardModels');
const { fncCstErrors } = require('../../utils/errors');

async function getCards(req, res) {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    fncCstErrors(error, res);
  }
}

async function postCards(req, res) {
  try {
    const card = new Card(req.body);
    card.owner = req.user._id;
    card.validate((err) => {
      if (err) {
        res.status(400);
        res.send('Введены некорректные данные');
      } else {
        card.save();
        res.send(card);
      }
    });
  } catch (error) {
    fncCstErrors(error, res);
  }
}

async function deleteCards(req, res) {
  try {
    if (await Card.findByIdAndRemove(req.params.cardId) !== null) {
      res.send('Карточка удалена');
    } else {
      res.status(400);
      res.send('Карточка была уже удалена');
    }
  } catch (error) {
    fncCstErrors(error, res);
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
      res.status(400);
      res.send('Ошибка');
    }
  } catch (error) {
    fncCstErrors(error, res);
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
      res.status(400);
      res.send('Ошибка');
    }
  } catch (error) {
    fncCstErrors(error, res);
  }
}

module.exports = {
  getCards,
  postCards,
  deleteCards,
  likeCard,
  dislikeCard,
};
