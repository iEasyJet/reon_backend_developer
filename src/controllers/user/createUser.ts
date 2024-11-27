import { Request, Response, NextFunction } from 'express';
/* ------------------------------------------------------------------- */
import User from '../../models/user';
import {
  createAnswerUser,
  encryptPassword,
  hasAccess,
} from '../../utils/helpers';
import { handleErrors } from '../../middlewars/handleErrors';
import { TCreateUser } from '../../utils/types/user/types';
import { ERR_FORBIDDEN_NO_RIGHTS_FOR_ADD_USER } from '../../utils/consts';
/* ------------------------------------------------------------------- */

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, password }: TCreateUser = req.body;

  try {
    await hasAccess(req, ERR_FORBIDDEN_NO_RIGHTS_FOR_ADD_USER);
    const newPassword = encryptPassword(password);

    const user = await User.create({
      name,
      password: newPassword,
    });

    res.status(201).send(createAnswerUser(user));
  } catch (err) {
    handleErrors(err, next);
  }
}
