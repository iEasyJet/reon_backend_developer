import { Request, Response, NextFunction } from 'express';
/* ------------------------------------------------------------------- */
import Board from '../../models/board';
import { createAnswerBoard, hasAccess } from '../../utils/helpers';
import * as CONSTS from '../../utils/consts';
import NotFoundError from '../../errors/NotFoundError';
/* ------------------------------------------------------------------- */

export async function toggleArchiveBoard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { boardId } = req.params;
  try {
    await hasAccess(
      req,
      CONSTS.ERR_FORBIDDEN_NO_RIGHTS_FOR_TOGGLE_ARCHIVE_BOARD
    );

    const board = await Board.findById(boardId);

    if (!board) {
      throw new NotFoundError(CONSTS.ERR_NFE_BOARD);
    }

    const updatedBoard = await Board.findByIdAndUpdate(
      boardId,
      { isActive: !board?.isActive },
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
