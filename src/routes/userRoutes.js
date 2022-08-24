const express = require('express');
const {
  getUsers, getUserById, patchUser, patchUserAvatar, aboutMe,
} = require('../controller/userControllers');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/me', aboutMe);
userRoutes.get('/:id', getUserById);
userRoutes.patch('/me', patchUser);
userRoutes.patch('/me/avatar', patchUserAvatar);

module.exports = {
  userRoutes,
};
