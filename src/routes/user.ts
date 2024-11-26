import express from 'express';

import { verifyToken } from '../middlewars/handlerToken';
import { createUser } from '../controllers/user/createUser';
import { loginUser } from '../controllers/user/loginUser';
import { checkToken } from '../controllers/user/checkToken';
import { archiveUser } from '../controllers/user/archiveUser';
import { deleteUser } from '../controllers/user/deleteUser';

/* ------------------------------------------------------------------- */

const router = express.Router();

router.post('/user/create', createUser);
router.post('/user/login', loginUser);
router.post('/user/auth', verifyToken, checkToken);

router.patch('/user/archive/:userId', verifyToken, archiveUser);

router.delete('/user/delete/:userId', verifyToken, deleteUser);

export default router;
