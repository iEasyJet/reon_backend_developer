import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cryptojs from 'crypto-js';
import { Request } from 'express';
/* ------------------------------------------------------------------- */
import User from '../models/user';
import * as CONSTS from './consts';
import { IUserModel } from './types/user/types';
import Forbidden from '../errors/Forbidden';
import { IBoardModel } from './types/board/types';
import { ITaskModel } from './types/task/types';

dotenv.config();

const { NODE_ENV, SIMPLE_SECRET_KEY, TOKEN_SECRET_KEY } = process.env;
/* ------------------------------------------------------------------- */

export function checkSecretKeys() {
  let secretKey: string;

  if (NODE_ENV === 'dev') {
    if (!SIMPLE_SECRET_KEY) {
      throw new Error(CONSTS.SIMPLE_SECRET_KEY_IS_NOT_DEFINED);
    }
    secretKey = SIMPLE_SECRET_KEY;
  } else {
    if (!TOKEN_SECRET_KEY) {
      throw new Error(CONSTS.TOKEN_SECRET_KEY_IS_NOT_DEFINED);
    }
    secretKey = TOKEN_SECRET_KEY;
  }

  return secretKey;
}

export function encryptPassword(password: string) {
  const secretKey = checkSecretKeys();
  try {
    return cryptojs.AES.encrypt(password, secretKey).toString();
  } catch (err) {
    throw new Error(CONSTS.ERR_CRYPTO_ENCRYPT_PASSWORD);
  }
}

export function decryptPassword(password: string) {
  const secretKey = checkSecretKeys();
  try {
    return cryptojs.AES.decrypt(password, secretKey).toString(
      cryptojs.enc.Utf8
    );
  } catch (err) {
    throw new Error(CONSTS.ERR_CRYPTO_DECRYPT_PASSWORD);
  }
}

export function createToken(userId: string) {
  const secretKey = checkSecretKeys();
  try {
    return jwt.sign({ id: userId }, secretKey, { expiresIn: '7d' });
  } catch (error) {
    throw new Error(CONSTS.ERR_JWT_SIGN_TOKEN);
  }
}

export function getTokenFromReqHeaders(req: Request) {
  const { authorization } = req.headers;

  if (authorization) {
    return authorization.split(' ')[1];
  } else {
    throw new Error(CONSTS.AUTH_HEADERS_IS_NOT_DEFINED);
  }
}

export function decodeToken(req: Request) {
  const secretKey = checkSecretKeys();

  try {
    let userId: string;
    const token = getTokenFromReqHeaders(req);
    const decoded = jwt.verify(token, secretKey);
    if (typeof decoded === 'object' && 'id' in decoded) {
      userId = decoded.id;
    } else {
      throw new Error(CONSTS.ERR_JWT_PALOAD_IS_NOT_DEFINED);
    }
    return userId;
  } catch {
    throw new Error(CONSTS.ERR_JWT_VERIFY_TOKEN);
  }
}

export function createAnswerUser(user: IUserModel, token?: string) {
  return {
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
    },
    token: token ?? undefined,
  };
}

export async function hasAccess(req: Request, errorMessage: string) {
  const reqUserId = decodeToken(req);
  const reqUser = await User.findById(reqUserId);

  if (reqUser?.role !== 'admin') {
    throw new Forbidden(errorMessage);
  }
}

export function hasAccessForUpdateTaskWhereIsPinned(
  req: Request,
  task: ITaskModel
) {
  const reqUserId = decodeToken(req);

  if (!task.pinnedUsers?.some((user) => user.toString() === reqUserId)) {
    throw new Forbidden(CONSTS.ERR_FORBIDDEN_NO_RIGHTS_FOR_UPDATE_TASK);
  }
}

export function getUserId(req: Request) {
  return decodeToken(req);
}

export function createAnswerBoard(board: IBoardModel) {
  return {
    board: {
      id: board._id,
      name: board.name,
      description: board.description,
      creatorId: board.creatorId,
      isActive: board.isActive,
      pinnedUsers: board.pinnedUsers,
      createdAt: board.createdAt,
    },
  };
}

export function createAnswerTask(task: ITaskModel) {
  return {
    task: {
      id: task._id,
      name: task.name,
      description: task.description,
      creatorId: task.creatorId,
      isActive: task.isActive,
      status: task.status,
      pinnedUsers: task.pinnedUsers,
      deadline: task.deadline,
    },
  };
}
