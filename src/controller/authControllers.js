const bcrypt = require('bcrypt');

const { User } = require('../models/userModels');
const { Unauthorized, Conflict, ValidationError } = require('../../utils/errors');
const { getJwtToken } = require('../../utils/jwt');

const SALT_ROUNDS = 10;

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new Unauthorized('Неправильно указан логин и/или пароль!');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Unauthorized('Неправильно указан логин и/или пароль!');
    }
    const token = getJwtToken(user.id);
    res
      .cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      })
      .send({ message: 'Вход в систему' });
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const {
      email, password, name, about, avatar,
    } = req.body;
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await User.create({
      email, password: hash, name, about, avatar,
    });
    newUser.validate((err) => {
      if (err) {
        res.status(400).send({ message: 'Введены некорректные данные' });
      } else {
        newUser.save();
        res.send({ message: 'Пользователь создан' });
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      next(new Conflict('Пользователь с таким email уже существует'));
    } else if (error.name === 'ValidationError') {
      next(new ValidationError('Введены некорректные данные'));
    } else {
      next(error);
    }
  }
}

module.exports = {
  login,
  createUser,
};
