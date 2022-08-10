const { Card } = require('../models/cardModels');
const { fncCstErrors, notFound } = require('../../utils/errors');

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
        res.status(notFound).send({ message: 'Введены некорректные данные' });
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
      res.status(notFound).send({ message: 'Карточка была уже удалена' });
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
      res.send({ message: 'Лайк поставлен' });
    } else {
      res.status(notFound).send({ message: 'Данные по этому id не найдены!' });
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
      res.send({ message: 'Лайк убран' });
    } else {
      res.status(notFound).send({ message: 'Данные по этому id не найдены!' });
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
