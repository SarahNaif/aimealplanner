import { create } from 'zustand'
import { persist } from 'zustand/middleware'


interface CreditStore {
    credits: number;
    setCredits: (newCredits: number) => void;
    minusCredit: ()=> void;
}


export const useCreditStore = create (
    persist<CreditStore>(
        (set)=> ({
            credits: 2,
            setCredits: (newCredits)=> set({credits: newCredits}),
            minusCredit: ()=> set((state)=> ({credits: state.credits - 1})),
        }),
        {
            name: 'credits'
        }
    )
)
