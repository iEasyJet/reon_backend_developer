import mongoose from 'mongoose';

export const boardSchemaDefinition = {
  name: {
    type: String,
    trim: true,
    default: 'Здесь должно быть название доски...',
  },
  description: {
    type: String,
    default: 'Здесь должно быть описание доски...',
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
  pinnedUsers: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
} as const;

const boardSchema = new mongoose.Schema(boardSchemaDefinition, {
  timestamps: true,
});

export default mongoose.model('Board', boardSchema);
