import { Request, Response, NextFunction } from 'express';
/* ------------------------------------------------------------------- */
import { ERR_SERVER } from '../utils/consts';
/* ------------------------------------------------------------------- */
export function singleHandlerErrors(
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? ERR_SERVER : message,
  });
  next();
}
