import mongoose, { Document, Schema } from 'mongoose';

export interface ICampaign extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  objective: 'traffic' | 'conversions' | 'brand_awareness' | 'reach' | 'engagement';
  status: 'draft' | 'active' | 'paused' | 'completed' | 'error';
  
  // Campaign Configuration
  budget: {
    type: 'daily' | 'lifetime';
    amount: number;
    currency: string;
  };
  
  // Targeting
  targeting: {
    locations: string[];
    ageMin: number;
    ageMax: number;
    gender: 'all' | 'male' | 'female';
    interests: string[];
    behaviors: string[];
    customAudiences: string[];
    lookalikes: string[];
  };
  
  // Schedule
  schedule: {
    startDate: Date;
    endDate?: Date;
    dayParting?: {
      days: number[];
      hours: number[];
    };
  };
  
  // Creative Content
  creative: {
    headline: string;
    primaryText: string;
    description?: string;
    callToAction: string;
    images: string[];
    videos: string[];
    destinationUrl: string;
    displayUrl?: string;
  };
  
  // AI Generated Content
  aiGenerated: {
    copyVariations: string[];
    imagePrompts: string[];
    suggestions: string[];
    optimizations: string[];
  };
  
  // Performance Metrics
  metrics: {
    impressions: number;
    reach: number;
    clicks: number;
    ctr: number;
    cpc: number;
    cpm: number;
    conversions: number;
    conversionRate: number;
    roas: number;
    spend: number;
    lastUpdated: Date;
  };
  
  // Meta Ads Integration
  metaAds: {
    campaignId?: string;
    adsetId?: string;
    adId?: string;
    accountId?: string;
    status?: string;
    errors?: string[];
  };
  
  // Business Info
  business: {
    name: string;
    category: string;
    description: string;
    website?: string;
    phone?: string;
    address?: string;
  };
  
  createdAt: Date;
  updatedAt: Date;
}

const CampaignSchema = new Schema<ICampaign>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  objective: {
    type: String,
    enum: ['traffic', 'conversions', 'brand_awareness', 'reach', 'engagement'],
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'completed', 'error'],
    default: 'draft',
  },
  budget: {
    type: {
      type: String,
      enum: ['daily', 'lifetime'],
      default: 'daily',
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    currency: {
      type: String,
      default: 'BRL',
    },
  },
  targeting: {
    locations: [String],
    ageMin: {
      type: Number,
      default: 18,
      min: 13,
      max: 65,
    },
    ageMax: {
      type: Number,
      default: 65,
      min: 13,
      max: 65,
    },
    gender: {
      type: String,
      enum: ['all', 'male', 'female'],
      default: 'all',
    },
    interests: [String],
    behaviors: [String],
    customAudiences: [String],
    lookalikes: [String],
  },
  schedule: {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
    dayParting: {
      days: [Number],
      hours: [Number],
    },
  },
  creative: {
    headline: {
      type: String,
      required: true,
    },
    primaryText: {
      type: String,
      required: true,
    },
    description: String,
    callToAction: {
      type: String,
      required: true,
    },
    images: [String],
    videos: [String],
    destinationUrl: {
      type: String,
      required: true,
    },
    displayUrl: String,
  },
  aiGenerated: {
    copyVariations: [String],
    imagePrompts: [String],
    suggestions: [String],
    optimizations: [String],
  },
  metrics: {
    impressions: { type: Number, default: 0 },
    reach: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    ctr: { type: Number, default: 0 },
    cpc: { type: Number, default: 0 },
    cpm: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
    conversionRate: { type: Number, default: 0 },
    roas: { type: Number, default: 0 },
    spend: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now },
  },
  metaAds: {
    campaignId: String,
    adsetId: String,
    adId: String,
    accountId: String,
    status: String,
    errors: [String],
  },
  business: {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    website: String,
    phone: String,
    address: String,
  },
}, {
  timestamps: true,
});

// Indexes for better performance
CampaignSchema.index({ userId: 1, status: 1 });
CampaignSchema.index({ createdAt: -1 });
CampaignSchema.index({ 'metrics.lastUpdated': 1 });

export default mongoose.models.Campaign || mongoose.model<ICampaign>('Campaign', CampaignSchema); 