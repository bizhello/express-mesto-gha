const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина 30 символов'],
    default: "MISHA",
  },
  about: {
    type: String,
    require: true,
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина 30 символов'],
    default: "IVANOV",
  },
  avatar: {
    type: String,
    require: true,
  },
})

exports.User = mongoose.model('user', userSchema);