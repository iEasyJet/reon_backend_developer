import { Request, Response, NextFunction } from 'express';
/* ------------------------------------------------------------------- */
import { createAnswerUser, hasAccessForDelete } from '../../utils/helpers';
import * as CONSTS from '../../utils/consts';
import User from '../../models/user';
import NotFoundError from '../../errors/NotFoundError';
/* ------------------------------------------------------------------- */

export async function archiveUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.params;
  try {
    await hasAccessForDelete(req);

    const user = await User.findByIdAndUpdate(
      userId,
      { status: 'inactive' },
      {
        new: true,
      }
    );
    if (!user) {
      throw new NotFoundError(CONSTS.ERR_NFE_USER);
    }
    res.status(200).send(createAnswerUser(user));
  } catch (err) {
    next(err);
  }
}
