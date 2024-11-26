import { Request, Response, NextFunction } from 'express';
/* ------------------------------------------------------------------- */
import Board from '../../models/board';
import { createAnswerBoard, hasAccess } from '../../utils/helpers';
import * as CONSTS from '../../utils/consts';
import NotFoundError from '../../errors/NotFoundError';
/* ------------------------------------------------------------------- */

export async function addUsersToBoard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id, pinnedUsers }: { id: string; pinnedUsers: string[] } = req.body;
  try {
    await hasAccess(req, CONSTS.ERR_FORBIDDEN_NO_RIGHTS_FOR_ADD_USERS_TO_BOARD);

    const updatedBoard = await Board.findByIdAndUpdate(
      id,
      { $addToSet: { pinnedUsers } },
      {
        new: true,
      }
    );

    if (!updatedBoard) {
      throw new NotFoundError(CONSTS.ERR_NFE_BOARD_ADD_USERS);
    }

    res.status(200).send(createAnswerBoard(updatedBoard));
  } catch (err) {
    next(err);
  }
}
