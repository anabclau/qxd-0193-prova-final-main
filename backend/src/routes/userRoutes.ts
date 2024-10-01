import { Router } from 'express';
import { createUser, listUsers, updateUser } from '../controllers/UserController';

const router = Router();

router.get('/', listUsers);
router.post('/', createUser);
router.put('/:id', updateUser);

export default router;

