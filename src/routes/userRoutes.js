import { Router } from 'express';
const userRoutes = Router();

import { getUsers, getUserById, postUsers, patchUser, patchUserAvatar } from '../controller/userControllers.js';

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);
userRoutes.post('/', postUsers);
userRoutes.patch('/me', patchUser);
userRoutes.patch('/me/avatar', patchUserAvatar);

export default userRoutes
