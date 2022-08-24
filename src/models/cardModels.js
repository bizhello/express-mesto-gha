const mongoose = require('mongoose');
require('mongoose-type-url');

const { ObjectId, Url } = mongoose.Schema.Types;
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина 30 символов'],
  },
  link: {
    type: Url,
    required: true,
  },
  owner: {
    // type: ObjectId,\
    type: String,
    // ref: 'user',
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
