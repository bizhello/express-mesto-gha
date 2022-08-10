const { User } = require('../models/userModels');
const { errors } = require('../../utils/errors');

async function getUsers(req, res) {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(errors.server[0]);
    res.send(errors.server[1]);
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id).orFail();
    res.send(user);
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(errors.user[0])
        .send({ message: 'Введены некорректные данные' });
    } else {
      res.status(errors.server[0])
        .send({ message: errors.server[1] });
    }
  }
}

async function postUser(req, res) {
  try {
    const user = new User(req.body);
    user.validate((err) => {
      if (err) {
        res.status(errors.user[0]);
        res.send('Введены некорректные данные');
      } else {
        user.save();
        res.send(user);
      }
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(errors.user[0]);
      res.send('Введены некорректные данные');
    } else {
      res.status(errors.server[0]);
      res.send(errors.server[1]);
    }
  }
}

async function patchUser(req, res) {
  try {
    await User.findOneAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });
    res.send('Данные успешно изменены');
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(errors.user[0]);
      res.send('Введены некорректные данные');
    } else {
      res.status(errors.server[0]);
      res.send(errors.server[1]);
    }
  }
}

async function patchUserAvatar(req, res) {
  try {
    await User.findOneAndUpdate(req.user._id, req.body, {
      runValidators: true,
      new: true,
    });
    res.send('Данные успешно изменены');
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(errors.user[0]);
      res.send('Введены некорректные данные');
    } else {
      res.status(errors.server[0]);
      res.send(errors.server[1]);
    }
  }
}

module.exports = {
  getUsers,
  getUserById,
  postUser,
  patchUser,
  patchUserAvatar,
};
