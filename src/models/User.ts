import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  provider?: 'google' | 'facebook' | 'credentials';
  providerId?: string;
  subscription: {
    plan: 'free' | 'starter' | 'pro' | 'enterprise';
    status: 'active' | 'inactive' | 'canceled';
    currentPeriodEnd?: Date;
  };
  usage: {
    campaignsCreated: number;
    creativesGenerated: number;
    monthlyLimit: number;
  };
  settings: {
    notifications: boolean;
    autoOptimization: boolean;
    language: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  image: String,
  provider: {
    type: String,
    enum: ['google', 'facebook', 'credentials'],
    default: 'credentials',
  },
  providerId: String,
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'starter', 'pro', 'enterprise'],
      default: 'free',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'canceled'],
      default: 'active',
    },
    currentPeriodEnd: Date,
  },
  usage: {
    campaignsCreated: {
      type: Number,
      default: 0,
    },
    creativesGenerated: {
      type: Number,
      default: 0,
    },
    monthlyLimit: {
      type: Number,
      default: 5, // Free plan limit
    },
  },
  settings: {
    notifications: {
      type: Boolean,
      default: true,
    },
    autoOptimization: {
      type: Boolean,
      default: true,
    },
    language: {
      type: String,
      default: 'pt-BR',
    },
  },
}, {
  timestamps: true,
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema); 