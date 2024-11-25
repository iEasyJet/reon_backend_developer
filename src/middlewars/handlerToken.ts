import { Request, Response, NextFunction } from 'express';
/* ------------------------------------------------------------------- */
import User from '../models/user';
import * as CONSTS from '../utils/consts';
import { decodeToken } from '../utils/helpers';
import Unauthorized from '../errors/Unauthorized';

/* ------------------------------------------------------------------- */

export async function verifyToken(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const decoded = decodeToken(req);

  if (decoded) {
    const user = await User.findById(decoded);

    if (!user) {
      return next(new Unauthorized(CONSTS.ERR_NOAUTH));
    }

    next();
  } else {
    next(new Unauthorized(CONSTS.ERR_NOAUTH));
  }
}
