import { Request, Response, NextFunction } from 'express';
/* ------------------------------------------------------------------- */
import { TLoginUser } from '../../utils/types/user/types';
import User from '../../models/user';
import * as CONSTS from '../../utils/consts';
import Unauthorized from '../../errors/Unauthorized';
import {
  createAnswerUser,
  createToken,
  decryptPassword,
} from '../../utils/helpers';
/* ------------------------------------------------------------------- */
export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, password }: TLoginUser = req.body;

  try {
    const user = await User.findOne({ name }).select('+password');

    if (!user) {
      throw new Unauthorized(CONSTS.ERR_NOAUTH);
    }

    const decryptUserPassword = decryptPassword(user.password);

    if (decryptUserPassword !== password) {
      throw new Unauthorized(CONSTS.ERR_NOAUTH);
    }

    const token = createToken(user._id.toString());

    res.status(200).send(createAnswerUser(user, token));
  } catch (err) {
    next(err);
  }
}
