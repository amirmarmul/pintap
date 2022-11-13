import { Router } from 'express';
import { use } from '../utils';

import auth from './auth';
import users from './users';

const router = Router()
router.use('/auth', use(auth));
router.use('/users', use(users));

export default router;
