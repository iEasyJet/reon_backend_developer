import mongoose from 'mongoose';

export const userSchemaDefinition = {
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
    match: /^[a-zA-Z0-9]+$/,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
} as const;

const userSchema = new mongoose.Schema(userSchemaDefinition, {
  timestamps: true,
});

export default mongoose.model('User', userSchema);
