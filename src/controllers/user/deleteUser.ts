import { Request, Response, NextFunction } from 'express';
/* ------------------------------------------------------------------- */
import { hasAccessForDelete } from '../../utils/helpers';
import NotFoundError from '../../errors/NotFoundError';
import * as CONSTS from '../../utils/consts';
import User from '../../models/user';
/* ------------------------------------------------------------------- */

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.params;
  try {
    await hasAccessForDelete(req);
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundError(CONSTS.ERR_NFE_USER);
    }
    res.status(200).send({ message: CONSTS.USER_DELETED });
  } catch (err) {
    next(err);
  }
}
