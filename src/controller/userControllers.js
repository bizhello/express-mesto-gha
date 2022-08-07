import User from '../models/userModels.js';
import errors from '../../utils/errors.js';

export async function getUsers(req, res) {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500);
    res.send(errors.server);
  }
}

export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (user !== null) {
      res.send(user);
    } else {
      res.status(500);
      res.send(errors.server);
    }
  } catch (error) {
    res.status(400);
    res.send(errors.user);
  }
}

export async function postUsers(req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400);
      res.send(errors.user);
    } else {
      res.status(500);
      res.send(errors.server);
    }
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
    } else {
      res.status(404);
      res.send(errors.url);
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400);
      res.send(errors.user);
    } else {
      res.status(500);
      res.send(errors.server);
    }
  }
}

export async function patchUserAvatar(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (user !== null) {
      user.avatar = req.body.avatar;
      await user.save();
      res.send(user);
    } else {
      res.status(404);
      res.send(errors.url);
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400);
      res.send(errors.user);
    } else {
      res.status(500);
      res.send(errors.server);
    }
  }
}
