import { Router } from 'express';
import { use } from '../utils';

import UsersController from '../../../interfaces/controllers/UsersController';
import requireAuth from '../middleware/requireAuth';
const router = Router();

router.route('/')
  .get(use(UsersController.list))
  .post(use(UsersController.create));

router.route('/:userId')
  .get(use(requireAuth), use(UsersController.get))
  .put(use(requireAuth), use(UsersController.update))
  .delete(use(requireAuth), use(UsersController.delete));

export default router;
