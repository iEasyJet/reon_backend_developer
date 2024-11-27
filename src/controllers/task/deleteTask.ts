import { Request, Response, NextFunction } from 'express';
/* ------------------------------------------------------------------- */
import Task from '../../models/task';
import { hasAccessForUpdateTaskWhereIsPinned } from '../../utils/helpers';
import NotFoundError from '../../errors/NotFoundError';
import * as CONSTS from '../../utils/consts';
/* ------------------------------------------------------------------- */

export async function deleteTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      throw new NotFoundError(CONSTS.ERR_NFE_TASK);
    }

    hasAccessForUpdateTaskWhereIsPinned(req, task);

    await Task.findByIdAndDelete(taskId);

    res.status(200).send({ message: CONSTS.TASK_DELETED });
  } catch (err) {
    next(err);
  }
}
