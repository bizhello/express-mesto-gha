import pkg from 'mongoose';

const { Schema, model } = pkg;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина 30 символов'],
  },
  about: {
    type: String,
    require: true,
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина 30 символов'],
  },
  avatar: {
    type: String,
    require: true,
  },
});

const User = model('user', userSchema);
export default User;
