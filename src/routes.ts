import { Router } from 'express';

import { createUser } from './useCases/User/createUser';
import { loginUser } from './useCases/auth/loginUser';
import { getUsers } from './useCases/User/getUsers';
import { editUser } from './useCases/User/editUser';
import { deleteUser } from './useCases/User/deleteUser';

import { checkToken } from './middlewares/checkToken';

export const router = Router();

//Create new user
router.post('/auth/register', createUser);

router.post('/auth/login', loginUser);

router.get('/users', checkToken, getUsers);

router.put('/user/:id', checkToken, editUser);

router.delete('/user/:id', checkToken, deleteUser);
