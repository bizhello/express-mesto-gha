const bcrypt = require('bcrypt');
const { User } = require('../models/userModels');
const { fncCstErrors, notFound } = require('../../utils/errors');
const { getJwtToken } = require('../../utils/jwt');

const SALT_ROUNDS = 10;

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.send({ message: 'Неправильно указан логин и/или пароль!' });
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.send({ message: 'Неправильно указан логин и/или пароль!' });
      return;
    }
    const token = getJwtToken(user.id);
    res
      .cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      })
      .send('Вход в систему');
    // res.status(200).send({ token });
  } catch (error) {
    fncCstErrors(error, res);
  }
}
async function createUser(req, res) {
  try {
    const {
      email, password, name, about, avatar,
    } = req.body;
    const user = await User.findOne({
      email,
    });
    if (user) {
      res.send({ message: 'Такой пользователь уже существует' });
      return;
    }
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await new User({
      email, password: hash, name, about, avatar,
    });
    newUser.validate((err) => {
      if (err) {
        res.status(notFound).send({ message: 'Введены некорректные данные' });
      } else {
        newUser.save();
        res.send(newUser);
      }
    });
  } catch (error) {
    fncCstErrors(error, res);
  }
}

module.exports = {
  login,
  createUser,
};
