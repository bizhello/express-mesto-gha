const { User } = require('../models/userModels');
const {
  ValidationError,
  NotFoundError,
} = require('../../utils/errors');

async function getUsers(req, res, next) {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
}

async function getUserById(req, res, next) {
  try {
    const user = await User.findById(req.params.id).orFail();
    res.send(user);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new NotFoundError('Пользователь с таким id не найден'));
    } else {
      next(error);
    }
  }
}

async function patchUser(req, res, next) {
  try {
    await User.findOneAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });
    res.send({ message: 'Данные успешно изменены' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new ValidationError('Введены некорректные данные'));
    } else {
      next(error);
    }
  }
}

async function patchUserAvatar(req, res, next) {
  try {
    await User.findOneAndUpdate(req.user, req.body, {
      runValidators: true,
      new: true,
    });
    res.send({ message: 'Данные успешно изменены' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new ValidationError('Введены некорректные данные'));
    } else {
      next(error);
    }
  }
}

async function aboutMe(req, res, next) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('Пользователь с таким id не найден');
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUsers,
  getUserById,
  aboutMe,
  patchUser,
  patchUserAvatar,
};
