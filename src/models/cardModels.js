import mongoose from 'mongoose';

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
    type: Object,
    ref: 'user',
    require: true,
  },
  likes: [{
    type: Object,
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Card = mongoose.model('card', cardSchema);
export default Card;
