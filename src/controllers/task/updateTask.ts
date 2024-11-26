import { Request, Response, NextFunction } from 'express';
/* ------------------------------------------------------------------- */
import Task from '../../models/task';
import {
  createAnswerTask,
  hasAccessForUpdateTaskWhereIsPinned,
} from '../../utils/helpers';
import NotFoundError from '../../errors/NotFoundError';
import * as CONSTS from '../../utils/consts';
import { TUpdateTask } from '../../utils/types/task/types';
/* ------------------------------------------------------------------- */

export async function updateTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id, name, description, boardId, status, deadline }: TUpdateTask =
    req.body;
  try {
    const task = await Task.findById(id);
    if (!task) {
      throw new NotFoundError(CONSTS.ERR_NFE_TASK_UPDATE);
    }

    hasAccessForUpdateTaskWhereIsPinned(req, task);

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { name, description, boardId, status, deadline },
      {
        new: true,
      }
    );

    if (!updatedTask) {
      throw new NotFoundError(CONSTS.ERR_NFE_TASK_UPDATE);
    }

    res.status(200).send(createAnswerTask(updatedTask));
  } catch (err) {
    next(err);
  }
}
