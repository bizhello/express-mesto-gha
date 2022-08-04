const {Card} = require('./../models/cardModels');
const {User} = require('./../models/userModels');
const {OK, CREATED} = require('../utils/constant');

exports.getCards = async(req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
    res.status(OK);
  } catch (error) {
    errorMessage(err.name, req, res);
  }
}

exports.postCards = async(req, res) => {
  try {
    const card = new Card(req.body);
    card.owner = '62ea2b052fa7abf2e4372ef7';
    await card.save();
    res.send(card);
    res.status(CREATED);
  } catch (error) {
    errorMessage(err.name, req, res);
  }
}

exports.deleteCards = async(req, res) => {
  try {
    await Card.findByIdAndRemove(req.params.cardId);
    res.send('DELETE');
    res.status(OK);
  } catch (error) {
    errorMessage(err.name, req, res);
  }
}

exports.putCardsLike = async(req, res) => {
  try {
    const card = await Card.findById('62ea988ef83686406494ccbf');
    const user = await User.findById('62ea7aaca9ea08a3cfe945ed');
    card.likes.push(user);
    await card.save();
    res.send(card);
    res.status(OK);
  } catch (error) {
    errorMessage(err.name, req, res);
  }
}

exports.deleteCardsLike = async(req, res) => {
  try {
    const card = await Card.findById('62ea988ef83686406494ccbf');
    const user = await User.findById('62ea7aaca9ea08a3cfe945ed');
    const newCardLikes = card.likes.filter(n => JSON.parse(JSON.stringify(n._id)) !== JSON.parse(JSON.stringify(user._id)));
    card.likes = newCardLikes;
    await card.save();
    res.send(card);
    res.status(OK);
  } catch (error) {
    errorMessage(err.name, req, res);
  }
}
