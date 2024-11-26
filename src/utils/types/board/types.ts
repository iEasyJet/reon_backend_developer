import { InferRawDocType, Types } from 'mongoose';
import { boardSchemaDefinition } from '../../../models/board';

/* ------------------------------------------------------------------- */

export type TCreateBoard = {
  name: string;
  description: string;
  pinnedUsers: string[];
};

export interface IBoardModel
  extends InferRawDocType<typeof boardSchemaDefinition> {
  _id: Types.ObjectId;
  createdAt: Date;
}
