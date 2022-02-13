import express from 'express';
import UserController from '../../controllers/UserController';

const userController = new UserController();

const UserRoutes = express.Router();

UserRoutes.post('/users', userController.create);

UserRoutes.post('/users/login', userController.login);

export default UserRoutes;