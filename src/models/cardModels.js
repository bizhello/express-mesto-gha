const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
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
    type: ObjectId,
    ref: 'user',
    require: true,
  },
  likes: [{
    type: ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// cardSchema.set('validateBeforeSave', false);
module.exports.Card = mongoose.model('card', cardSchema);
