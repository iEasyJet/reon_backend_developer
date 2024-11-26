import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
/* ------------------------------------------------------------------- */
import Board from '../../models/board';
import { createAnswerBoard, getUserId, hasAccess } from '../../utils/helpers';
import * as CONSTS from '../../utils/consts';
import { TCreateBoard } from '../../utils/types/board/types';
import { handleErrors } from '../../middlewars/handleErrors';
/* ------------------------------------------------------------------- */

export async function createBoard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, description, pinnedUsers }: TCreateBoard = req.body;

  try {
    await hasAccess(req, CONSTS.ERR_FORBIDDEN_NO_RIGHTS_FOR_CREATE_BOARD);

    const userId = getUserId(req);
    const board = await Board.create({
      name,
      description,
      creatorId: userId,
      pinnedUsers: pinnedUsers.map(
        (userId: string) => new mongoose.Types.ObjectId(userId)
      ),
    });

    res.status(201).send(createAnswerBoard(board));
  } catch (err) {
    handleErrors(err, next);
  }
}
