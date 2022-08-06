/* eslint-disable import/extensions */
import User from '../models/userModels.js';

export async function getUsers(req, res) {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
}

export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (user !== undefined) {
      res.send(user);
    }
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
}

export async function postUsers(req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
}

export async function patchUser(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (user !== null) {
      user.name = req.body.name;
      user.about = req.body.about;
      await user.save();
      res.send(user);
    }
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
}

export async function patchUserAvatar(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (user !== null) {
      user.avatar = req.body.avatar;
      await user.save();
      res.send(user);
    }
  } catch (error) {
    res.status(404);
    res.send(error.message);
  }
}
