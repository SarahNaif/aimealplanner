export type PlanName = 'Free' | 'Basic' | 'Premium';

export interface PlanDetails {
  price: number; // Price in USD
  credits: number;
}

export const PLANS: Record<PlanName, PlanDetails> = {
  Free: {
    price: 0,
    credits: 2,
  },
  Basic: {
    price: 3, // Price in USD
    credits: 3,
  },
  Premium: {
    price: 5,
    credits: 5,
  },
};