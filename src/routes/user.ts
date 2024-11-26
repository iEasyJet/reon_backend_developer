import express from 'express';
/* ------------------------------------------------------------------- */
import { verifyToken } from '../middlewars/handlerToken';
import { createUser } from '../controllers/user/createUser';
import { loginUser } from '../controllers/user/loginUser';
import { checkToken } from '../controllers/user/checkToken';
import { toggleArchiveUser } from '../controllers/user/toggleArchiveUser';
import { deleteUser } from '../controllers/user/deleteUser';
/* ------------------------------------------------------------------- */

const router = express.Router();

router.post('/create', verifyToken, createUser);
router.post('/login', loginUser);
router.post('/auth', verifyToken, checkToken);

router.patch('/toggle-archive/:userId', verifyToken, toggleArchiveUser);

router.delete('/delete/:userId', verifyToken, deleteUser);

export default router;
