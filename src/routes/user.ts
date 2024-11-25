import express from 'express';
import {
  archiveUser,
  checkToken,
  createUser,
  deleteUser,
  loginUser,
} from '../controllers/user';
import { verifyToken } from '../middlewars/handlerToken';

/* ------------------------------------------------------------------- */

const router = express.Router();

router.post('/user/auth', verifyToken, checkToken);
router.post('/user/create', createUser);
router.post('/user/login', loginUser);

router.patch('/user/archive/:userId', verifyToken, archiveUser);

router.delete('/user/delete/:userId', verifyToken, deleteUser);

export default router;
