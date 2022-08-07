import { Router } from 'express';
import {
  getUsers, getUserById, postUsers, patchUser, patchUserAvatar,
} from '../controller/userControllers.js';

const userRoutes = Router();
userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);
userRoutes.post('/', postUsers);
userRoutes.patch('/me', patchUser);
userRoutes.patch('/me/avatar', patchUserAvatar);

export default userRoutes;
