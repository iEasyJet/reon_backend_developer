import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
/* ------------------------------------------------------------------- */
import Task from '../../models/task';
import { createAnswerTask, hasAccess } from '../../utils/helpers';
import NotFoundError from '../../errors/NotFoundError';
import * as CONSTS from '../../utils/consts';
/* ------------------------------------------------------------------- */

export async function deleteUsersFromTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id, pinnedUsers }: { id: string; pinnedUsers: string[] } = req.body;
  try {
    await hasAccess(
      req,
      CONSTS.ERR_FORBIDDEN_NO_RIGHTS_FOR_DELETE_USERS_FROM_TASK
    );

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        $pull: {
          pinnedUsers: {
            $in: pinnedUsers.map(
              (userId) => new mongoose.Types.ObjectId(userId)
            ),
          },
        },
      },
      {
        new: true,
      }
    );

    if (!updatedTask) {
      throw new NotFoundError(CONSTS.ERR_NFE_TASK);
    }

    res.status(200).send(createAnswerTask(updatedTask));
  } catch (err) {
    next(err);
  }
}
