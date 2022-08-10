const express = require('express');
const {
  getUsers, getUserById, postUser, patchUser, patchUserAvatar,
} = require('../controller/userControllers');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);
userRoutes.post('/', postUser);
userRoutes.patch('/me', patchUser);
userRoutes.patch('/me/avatar', patchUserAvatar);

module.exports = {
  userRoutes,
};
