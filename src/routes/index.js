/* eslint-disable import/extensions */
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './userRoutes.js';
import cardRoutes from './cardRoutes.js';

const routes = express.Router();

routes.use(bodyParser.json());
routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

export default routes;
