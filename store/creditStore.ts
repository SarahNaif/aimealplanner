import { create } from 'zustand'
import { persist } from 'zustand/middleware'


interface CreditStore {
    credits: number;
    plan: string,
    setCredits: (newCredits: number, newPlan: string) => void;
    minusCredit: ()=> void;
}


export const useCreditStore = create (
    persist<CreditStore>(
        (set)=> ({
            credits: 2,
            plan: 'Free',
            setCredits: (newCredits, newPlan)=> set({credits: newCredits, plan: newPlan}),
            minusCredit: ()=> set((state)=> ({credits: state.credits - 1})),
        }),
        {
            name: 'credits'
        }
    )
)
