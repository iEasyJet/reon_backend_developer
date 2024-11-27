import { Request, Response, NextFunction } from 'express';
/* ------------------------------------------------------------------- */
import Board from '../../models/board';
import { createAnswerBoard, hasAccess } from '../../utils/helpers';
import * as CONSTS from '../../utils/consts';
import NotFoundError from '../../errors/NotFoundError';
/* ------------------------------------------------------------------- */

export async function updateBoard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    id,
    name,
    description,
  }: { id: string; name: string; description: string } = req.body;
  try {
    await hasAccess(req, CONSTS.ERR_FORBIDDEN_NO_RIGHTS_FOR_UPDATE_BOARD);

    const updatedBoard = await Board.findByIdAndUpdate(
      id,
      { name, description },
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
