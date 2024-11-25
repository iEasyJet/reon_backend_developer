import { NextFunction } from 'express';
import { MongooseError } from 'mongoose';
import * as CONSTS from '../utils/consts';
import ValidationError from '../errors/ValidationError';
import ConflictError from '../errors/ConflictError';

export function handleErrors(err: any, next: NextFunction) {
  if (err instanceof ValidationError) {
    next(new ValidationError(CONSTS.ERR_VE));
  } else if (err instanceof MongooseError) {
    next(new ConflictError(CONSTS.ERR_CE_USER));
  } else {
    next(err);
  }
}
