import { Router } from 'express';
import { use } from '../utils';

import AuthController from '../../../interfaces/controllers/AuthController';

const router = Router();

router.route('/login')
  .post(use(AuthController.login))

export default router;
