import { Request, Response, NextFunction } from 'express';
/* ------------------------------------------------------------------- */
import Board from '../../models/board';
import { hasAccess } from '../../utils/helpers';
import * as CONSTS from '../../utils/consts';
import NotFoundError from '../../errors/NotFoundError';
/* ------------------------------------------------------------------- */

export async function deleteBoard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { boardId } = req.params;
  try {
    await hasAccess(req, CONSTS.ERR_FORBIDDEN_NO_RIGHTS_FOR_DELETE_BOARD);
    const board = await Board.findByIdAndDelete(boardId);
    if (!board) {
      throw new NotFoundError(CONSTS.ERR_NFE_BOARD);
    }
    res.status(200).send({ message: CONSTS.BOARD_DELETED });
  } catch (err) {
    next(err);
  }
}
