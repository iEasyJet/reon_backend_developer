import { Request, Response, NextFunction } from 'express';
/* ------------------------------------------------------------------- */
import Task from '../../models/task';
import { createAnswerTask, hasAccess } from '../../utils/helpers';
import NotFoundError from '../../errors/NotFoundError';
import * as CONSTS from '../../utils/consts';
/* ------------------------------------------------------------------- */

export async function addUsersToTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id, pinnedUsers }: { id: string; pinnedUsers: string[] } = req.body;
  try {
    await hasAccess(req, CONSTS.ERR_FORBIDDEN_NO_RIGHTS_FOR_ADD_USERS_TO_TASK);

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $addToSet: { pinnedUsers } },
      {
        new: true,
      }
    );

    if (!updatedTask) {
      throw new NotFoundError(CONSTS.ERR_NFE_TASK_ADD_USERS);
    }

    res.status(200).send(createAnswerTask(updatedTask));
  } catch (err) {
    next(err);
  }
}
