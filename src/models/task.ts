import mongoose from 'mongoose';

export const taskSchemaDefinition = {
  name: {
    type: String,
    trim: true,
    default: 'Здесь должно быть название задачи...',
  },
  description: {
    type: String,
    default: 'Здесь должно быть описание задачи...',
  },
  creatorId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  boardId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Board',
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'inProgress', 'completed'],
    default: 'open',
  },
  deadline: {
    type: Date,
    default: Date.now(),
  },
  pinnedUsers: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
} as const;

const taskSchema = new mongoose.Schema(taskSchemaDefinition, {
  timestamps: true,
});

export default mongoose.model('Task', taskSchema);
