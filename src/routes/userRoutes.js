const express = require('express');
const {
  getUsers, getUserById, postUsers, patchUser, patchUserAvatar,
} = require('../controller/userControllers');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);
userRoutes.post('/', postUsers);
userRoutes.patch('/me', patchUser);
userRoutes.patch('/me/avatar', patchUserAvatar);

module.exports = {
  userRoutes,
};
