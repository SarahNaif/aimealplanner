import { create } from 'zustand';
import { deductCredits } from '@/lib/actions/credits.actions';

interface CreditStore {
  credits: number ;
  plan: string;
  setCredits: (newCredits: number, newPlan: string) => void;
  minusCredit: (userId: string) => Promise<void>;
}

export const useCreditStore = create<CreditStore>((set) => ({
  credits: 0,
  plan: 'Free',
  setCredits: (newCredits, newPlan) => set({ credits: newCredits, plan: newPlan }),
  minusCredit: async (userId) => {
    try {

      const deductedCredits = await deductCredits(userId, 1); 
      console.log("Credits deducted from DB:", deductedCredits);

     
      set((state) => {

        const currentCredits = state.credits ?? 0; 
        const newCredits = currentCredits > 0 ? currentCredits - 1 : 0; 
        console.log("Updated local credits:", newCredits);
        return { credits: newCredits };
      });
    } catch (error) {
      console.error("Error deducting credits:", error);
      throw error; 
    }
  },
}));