const { Card } = require('../models/cardModels');
const {
  NotFoundError,
  Forbidden,
} = require('../../utils/errors');

async function getCards(req, res, next) {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    next(error);
  }
}

async function postCards(req, res, next) {
  try {
    const card = new Card(req.body);
    card.owner = req.user._id;
    card.validate((err) => {
      if (err) {
        res.status(400).send({ message: 'Введены некорректные данные' });
      } else {
        card.save();
        res.send({ message: 'Карточка успешно создана' });
      }
    });
  } catch (error) {
    next(error);
  }
}

async function deleteCards(req, res, next) {
  try {
    const card = await Card.findById(req.params.cardId);
    if (card === null) {
      throw new NotFoundError('Карточка была уже удалена');
    }
    if (req.user._id === card.owner) {
      if (await Card.findByIdAndRemove(req.params.cardId) !== null) {
        res.send({ message: 'Карточка удалена' });
      } else {
        throw new NotFoundError('Карточка была уже удалена');
      }
    } else {
      throw new Forbidden('Удалять можно только свои карточки');
    }
  } catch (error) {
    next(error);
  }
}

async function likeCard(req, res, next) {
  try {
    const card = await Card.findById(req.params.cardId);
    if (card) {
      await Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
      );
      res.send({ message: 'Лайк поставлен' });
    }
  } catch (error) {
    if (error.name === 'CastError') {
      next(new NotFoundError('Данные по этому id не найдены'));
    } else {
      next(error);
    }
  }
}

async function dislikeCard(req, res, next) {
  try {
    const card = await Card.findById(req.params.cardId);
    if (card) {
      await Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
      );
      res.send({ message: 'Лайк убран' });
    }
  } catch (error) {
    if (error.name === 'CastError') {
      next(new NotFoundError('Данные по этому id не найдены'));
    } else {
      next(error);
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
