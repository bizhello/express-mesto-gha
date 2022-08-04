const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина 30 символов'],
  },
  link: {
    type: String,
    require: true,
  },
  owner: {
    type: 'ObjectId',
    require: true,
  },
  likes: {
    type: Array,
    require: true,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

exports.Card = mongoose.model('card', cardSchema);
