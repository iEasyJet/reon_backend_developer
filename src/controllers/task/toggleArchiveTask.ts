import { Request, Response, NextFunction } from 'express';
/* ------------------------------------------------------------------- */
import Task from '../../models/task';
import {
  createAnswerTask,
  hasAccessForUpdateTaskWhereIsPinned,
} from '../../utils/helpers';
import NotFoundError from '../../errors/NotFoundError';
import * as CONSTS from '../../utils/consts';
/* ------------------------------------------------------------------- */

export async function toggleArchiveTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId);

    if (!task) {
      throw new NotFoundError(CONSTS.ERR_NFE_TASK_UPDATE);
    }

    hasAccessForUpdateTaskWhereIsPinned(req, task);

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { isActive: !task?.isActive },
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
