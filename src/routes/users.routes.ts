import { Router } from 'express';
import { createUser, loginUser } from '../controllers/users.controller';

const router = Router();

router.post('/signup', createUser);
router.post('/login', loginUser);

export default router;