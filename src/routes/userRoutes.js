const express = require('express');
const userRoutes = express.Router();

const userControllers = require('./../controller/userControllers');

userRoutes.get('/', userControllers.getUsers);
userRoutes.get('/:id', userControllers.getUserById);
userRoutes.post('/', userControllers.postUsers);
userRoutes.patch('/me', userControllers.patchUser);
userRoutes.patch('/me/avatar', userControllers.patchUserAvatar);


module.exports = {
  userRoutes,
}


//patchUser