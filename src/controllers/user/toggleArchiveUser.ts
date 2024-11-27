import { Request, Response, NextFunction } from 'express';
/* ------------------------------------------------------------------- */
import { createAnswerUser, hasAccess } from '../../utils/helpers';
import * as CONSTS from '../../utils/consts';
import User from '../../models/user';
import NotFoundError from '../../errors/NotFoundError';
/* ------------------------------------------------------------------- */

export async function toggleArchiveUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.params;
  try {
    await hasAccess(
      req,
      CONSTS.ERR_FORBIDDEN_NO_RIGHTS_FOR_TOGGLE_ARCHIVE_USER
    );

    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError(CONSTS.ERR_NFE_USER);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isActive: !user?.isActive },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      throw new NotFoundError(CONSTS.ERR_NFE_USER);
    }

    res.status(200).send(createAnswerUser(updatedUser));
  } catch (err) {
    next(err);
  }
}
