import { Request, Response, NextFunction } from 'express';
/* ------------------------------------------------------------------- */
import {
  createAnswerUser,
  decodeToken,
  getTokenFromReqHeaders,
} from '../../utils/helpers';
import User from '../../models/user';
import * as CONSTS from '../../utils/consts';
import Unauthorized from '../../errors/Unauthorized';
/* ------------------------------------------------------------------- */

export async function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = decodeToken(req);
    const user = await User.findById(userId);

    if (!user) {
      return next(new Unauthorized(CONSTS.ERR_NOAUTH));
    }

    const token = getTokenFromReqHeaders(req);

    res.status(200).send(createAnswerUser(user, token));
  } catch (err) {
    next(err);
  }
}
