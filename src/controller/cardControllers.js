// eslint-disable-next-line import/extensions
import Card from '../models/cardModels.js';

export async function getCards(req, res) {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
}

export async function postCards(req, res) {
  try {
    const card = new Card(req.body);
    card.owner = req.user._id;
    await card.save();
    res.send(card);
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
}

export async function deleteCards(req, res) {
  try {
    await Card.findByIdAndRemove(req.params.cardId);
    res.send('DELETE CARD');
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
}

export async function likeCard(req, res) {
  try {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
}

export async function dislikeCard(req, res) {
  try {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
}
