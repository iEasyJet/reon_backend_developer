import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
/* ------------------------------------------------------------------- */
import Board from '../../models/board';
import { createAnswerBoard, hasAccess } from '../../utils/helpers';
import * as CONSTS from '../../utils/consts';
import NotFoundError from '../../errors/NotFoundError';
/* ------------------------------------------------------------------- */

export async function deleteUsersFromBoard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id, pinnedUsers }: { id: string; pinnedUsers: string[] } = req.body;
  try {
    await hasAccess(
      req,
      CONSTS.ERR_FORBIDDEN_NO_RIGHTS_FOR_DELETE_USERS_FROM_BOARD
    );

    const updatedBoard = await Board.findByIdAndUpdate(
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

    if (!updatedBoard) {
      throw new NotFoundError(CONSTS.ERR_NFE_BOARD);
    }

    res.status(200).send(createAnswerBoard(updatedBoard));
  } catch (err) {
    next(err);
  }
}
