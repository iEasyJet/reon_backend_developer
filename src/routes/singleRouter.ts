import express from 'express';
/* ------------------------------------------------------------------- */
import NotFoundError from '../errors/NotFoundError';
import { ERR_NFE_WRONG_ROUTE } from '../utils/consts';

import userRouter from './user';
import boardRouter from './board';
/* ------------------------------------------------------------------- */

const router = express.Router();

router.use('/board', boardRouter);
router.use('/user', userRouter);

router.use((_, __, next) => {
  next(new NotFoundError(ERR_NFE_WRONG_ROUTE));
});

export default router;
