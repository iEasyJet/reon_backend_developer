import { InferRawDocType, Types } from 'mongoose';
import { taskSchemaDefinition } from '../../../models/task';

/* ------------------------------------------------------------------- */

export type TCreateTask = {
  name: string;
  description: string;
  pinnedUsers: string[];
  deadline: Date;
  boardId: string;
};

export type TUpdateTask = {
  id: string;
  name: string;
  description: string;
  boardId: string;
  status: 'open' | 'inProgress' | 'completed';
  deadline: Date;
};

export interface ITaskModel
  extends InferRawDocType<typeof taskSchemaDefinition> {
  _id: Types.ObjectId;
}
