import { Router } from 'express';


import authController from './controllers/authController';
import UserController  from './controllers/userController';
import { checkToken } from './middlewares/checkToken';

export const router = Router();

//Create new user
router.post('/auth/register', UserController.store);

router.post('/auth/login', authController.auth);

router.get('/users', checkToken, UserController.index);

router.put('/user/:id', checkToken, UserController.update);

router.delete('/user/:id', checkToken, UserController.delete);
