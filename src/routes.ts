import { Router } from 'express';

import { createUser } from './useCases/User/createUser';
import { loginUser } from './useCases/auth/loginUser';
import { getUsers } from './useCases/User/getUsers';

import { checkToken } from './middlewares/checkToken';

export const router = Router();

//Create new user
router.post('/auth/register', createUser);

router.post('/auth/login', loginUser);

router.get('/users', checkToken, getUsers);
