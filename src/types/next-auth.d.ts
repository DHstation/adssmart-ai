import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      subscription?: {
        plan: 'free' | 'starter' | 'pro' | 'enterprise';
        status: 'active' | 'inactive' | 'canceled';
        currentPeriodEnd?: Date;
      };
      usage?: {
        campaignsCreated: number;
        creativesGenerated: number;
        monthlyLimit: number;
      };
    };
  }

  interface JWT {
    id?: string;
    subscription?: {
      plan: 'free' | 'starter' | 'pro' | 'enterprise';
      status: 'active' | 'inactive' | 'canceled';
      currentPeriodEnd?: Date;
    };
    usage?: {
      campaignsCreated: number;
      creativesGenerated: number;
      monthlyLimit: number;
    };
  }
} 