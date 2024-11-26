import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
/* ------------------------------------------------------------------- */
import Task from '../../models/task';
import { createAnswerTask, getUserId } from '../../utils/helpers';
import { handleErrors } from '../../middlewars/handleErrors';
import { TCreateTask } from '../../utils/types/task/types';
/* ------------------------------------------------------------------- */

export async function createTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, description, pinnedUsers, deadline, boardId }: TCreateTask =
    req.body;

  try {
    const userId = getUserId(req);
    const task = await Task.create({
      name,
      description,
      creatorId: new mongoose.Types.ObjectId(userId),
      deadline,
      boardId: new mongoose.Types.ObjectId(boardId),
      pinnedUsers: pinnedUsers.map(
        (userId: string) => new mongoose.Types.ObjectId(userId)
      ),
    });

    res.status(201).send(createAnswerTask(task));
  } catch (err) {
    handleErrors(err, next);
  }
}
