import { Request, Response, NextFunction } from 'express';
/* ------------------------------------------------------------------- */
import User from '../models/user';
import {
  createAnswerUser,
  createToken,
  decodeToken,
  decryptPassword,
  encryptPassword,
  getTokenFromReqHeaders,
} from '../utils/helpers';
import { handleErrors } from '../middlewars/handleErrors';
import { TCreateUser, TLoginUser } from './types';
import * as CONSTS from '../utils/consts';
import Unauthorized from '../errors/Unauthorized';
import NotFoundError from '../errors/NotFoundError';
import Forbidden from '../errors/Forbidden';

/* ------------------------------------------------------------------- */

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, password }: TCreateUser = req.body;

  try {
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

export async function archiveUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.params;
  try {
    const reqUserId = decodeToken(req);
    const reqUser = await User.findById(reqUserId);

    if (reqUser?.role !== 'admin') {
      throw new Forbidden(CONSTS.ERR_FORBIDDEN_NO_RIGHTS_FOR_ARCHIVE_USER);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { status: 'inactive' },
      {
        new: true,
      }
    );
    if (!user) {
      throw new NotFoundError(CONSTS.ERR_NFE_USER);
    }
    res.status(200).send(createAnswerUser(user));
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.params;
  try {
    const reqUserId = decodeToken(req);
    const reqUser = await User.findById(reqUserId);

    if (reqUser?.role !== 'admin') {
      throw new Forbidden(CONSTS.ERR_FORBIDDEN_NO_RIGHTS_FOR_DELETE_USER);
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundError(CONSTS.ERR_NFE_USER);
    }
    res.status(200).send({ message: CONSTS.USER_DELETED });
  } catch (err) {
    next(err);
  }
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, password }: TLoginUser = req.body;

  try {
    const user = await User.findOne({ name }).select('+password');

    if (!user) {
      throw new Unauthorized(CONSTS.ERR_NOAUTH);
    }

    const decryptUserPassword = decryptPassword(user.password);

    if (decryptUserPassword !== password) {
      throw new Unauthorized(CONSTS.ERR_NOAUTH);
    }

    const token = createToken(user._id.toString());

    res.status(200).send(createAnswerUser(user, token));
  } catch (err) {
    next(err);
  }
}

export async function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = decodeToken(req);
    const user = await User.findById(userId);

    if (!user) {
      return next(new Unauthorized(CONSTS.ERR_NOAUTH));
    }

    const token = getTokenFromReqHeaders(req);

    res.status(200).send(createAnswerUser(user, token));
  } catch (err) {
    next(err);
  }
}
