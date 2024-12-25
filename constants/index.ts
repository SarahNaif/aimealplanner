import { PlanDescription, PlanEmoji, PlanName } from '@/types/types';
import { PLANS } from './plan';

// Descriptions for each plan
const DESCRIPTIONS: Record<PlanName, PlanDescription> = {
  Free: 'Get started with meal planning',
  Basic: 'Most popular choice for foodies',
  Premium: 'For the serious meal preppers',
};

// Emojis for each plan
const EMOJIS: Record<PlanName, PlanEmoji> = {
  Free: '🍽️',
  Basic: '👨‍🍳',
  Premium: '🥇',
};

// Transforming PLANS into an array with additional details
export const plans = Object.entries(PLANS).map(([name, details]) => {
  const planName = name as PlanName; // Ensures proper typing

  return {
    name: planName,
    emoji: EMOJIS[planName],
    description: DESCRIPTIONS[planName],
    price: `$${details.price}`,
    credits: details.credits,
    features: [
      `${details.credits} AI-generated meal plans`,
      "Advanced recipe customization",
      "Nutritional breakdown",
    ],
  };
});
