import { InferRawDocType, Types } from 'mongoose';
import { userSchemaDefinition } from '../models/user';

/* ------------------------------------------------------------------- */

export type TCreateUser = { name: string; password: string };
export type TLoginUser = { name: string; password: string };
export interface IUserModel
  extends InferRawDocType<typeof userSchemaDefinition> {
  _id: Types.ObjectId;
}
