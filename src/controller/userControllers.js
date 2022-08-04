const {User} = require('./../models/userModels');
const {OK, CREATED} = require('../utils/constant');

exports.getUsers = async(req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
    res.status(OK);
  } catch (error) {
    errorMessage(err.name, req, res);
  }
}

exports.getUserById = async(req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
    res.status(OK);
  } catch (error) {
    errorMessage(err.name, req, res);
  }
}

exports.postUsers = async(req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send(user);
    res.status(CREATED);
  } catch (error) {
      errorMessage(err.name, req, res);
  }
}

exports.patchUser = async(req, res) => {
  try {
    const user = await User.findById('62ea7c0fc2678588d91ae7ca');
    user.name = req.body.name;
    user.about = req.body.about;
    await user.save();
    res.send(user);
    res.status(OK);
  } catch (error) {
    errorMessage(err.name, req, res);
  }
}

exports.patchUserAvatar = async(req, res) => {
  try {
    const user = await User.findById('62ea7c0fc2678588d91ae7ca');
    user.avatar = req.body.avatar;
    await user.save();
    res.send(user);
    res.status(OK);
  } catch (error) {
    errorMessage(err.name, req, res);
  }
}
