const { User } = require('../models/userModels');
const { fncCstErrors } = require('../../utils/errors');

async function getUsers(req, res) {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    fncCstErrors(error, res);
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id).orFail();
    res.send(user);
  } catch (error) {
    fncCstErrors(error, res);
  }
}

async function patchUser(req, res) {
  try {
    await User.findOneAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });
    res.send({ message: 'Данные успешно изменены' });
  } catch (error) {
    fncCstErrors(error, res);
  }
}

async function patchUserAvatar(req, res) {
  try {
    await User.findOneAndUpdate(req.user._id, req.body, {
      runValidators: true,
      new: true,
    });
    res.send({ message: 'Данные успешно изменены' });
  } catch (error) {
    fncCstErrors(error, res);
  }
}

async function aboutMe(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.send({ message: 'Пользователь с таким id не найден' });
      return;
    }
    res.send(user);
  } catch (error) {
    fncCstErrors(error, res);
  }
}

module.exports = {
  getUsers,
  getUserById,
  aboutMe,
  patchUser,
  patchUserAvatar,
};
