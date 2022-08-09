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
    const user = await User.findById(req.params.id);
    if (user !== null) {
      res.send(user);
    } else {
      res.status(errors.url[0]);
      res.send('Пользователь не найден');
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(errors.user[0]);
      res.send('Введены некорректные данные');
    } else {
      res.status(errors.server[0]);
      res.send(errors.server[1]);
    }
  }
}

async function postUsers(req, res) {
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
    const user = await User.findById(req.user._id);
    user.name = req.body.name;
    user.about = req.body.about;
    user.validate((err) => {
      if (err) {
        res.status(errors.user[0]);
        res.send('Введены некорректные данные');
      } else {
        user.save();
        res.send('Данные успешно изменены');
      }
    });
  } catch (error) {
    if (error.name === 'ValidatorError') {
      res.status(errors.user[0]);
      res.send(errors.user[1]);
    } else {
      res.status(errors.server[0]);
      res.send(errors.server[1]);
    }
  }
}

async function patchUserAvatar(req, res) {
  try {
    const user = await User.findById(req.user._id);
    user.avatar = req.body.avatar;
    user.validate((err) => {
      if (err) {
        res.status(errors.user[0]);
        res.send('Введены некорректные данные');
      } else {
        user.save();
        res.send('Данные успешно изменены');
      }
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(errors.user[0]);
      res.send(errors.user[1]);
    } else {
      res.status(errors.server[0]);
      res.send(errors.server[1]);
    }
  }
}
module.exports = {
  getUsers,
  getUserById,
  postUsers,
  patchUser,
  patchUserAvatar,
};
