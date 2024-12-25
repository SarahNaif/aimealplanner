"use client";
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { PlanCredit } from '@/types/types';
import { SignedIn } from '@clerk/nextjs';
import { Check } from 'lucide-react'
import { useState } from 'react';



interface CardPlanProps {
    plan: PlanCredit;
    key: number;
    userId: string
}
const CardPlan: React.FC<CardPlanProps> = ({ plan, key, userId }) => {
    const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const handleClick = async () => {
    if (loading || key === 0) return
    setLoading(true)

    try {

        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId,plan})
        })
        if(!response.ok){ throw new Error('Failed to create checkout session')}

        const data = await response.json()
        window.location.href = data.url
        
    } catch (error:any) {
        setError(error.message || 'An error occurred')
    } finally {
        setLoading(false)
    }
  }


    return (
        <Card className="flex flex-col justify-between border-2 hover:border-slate-600 transition-all duration-300 overflow-hidden">
            <CardHeader>
                <CardTitle className="text-3xl font-bold flex items-center gap-2">
                    <span role="img" aria-label={plan.name} className="text-4xl">{plan.emoji}</span> {plan.name}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="mt-4 flex items-baseline gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">{plan.price}</span>
                    <span className="text-base font-semibold leading-7 text-gray-600">/month</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                    {plan.credits} credit{plan.credits > 1 ? "s" : ""} per month
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                    {plan.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3 items-center">
                            <Check className="h-5 w-5 flex-none text-slate-600" aria-hidden="true" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                {plan.name === 'Free' ? (
                   <Button 
                   className="w-full text-lg py-6 rounded-md"
                   variant={key === 1 ? "default" : "outline"}
                   disabled={ true }
                   >

                   </Button> 
                ): (
                    <SignedIn>
                        <Button
                            className="w-full text-lg py-6 rounded-md"
                            variant={key === 1 ? "default" : "outline"}
                            disabled={key === 0 ? true : false}
                            onClick={handleClick}
                        >
                            {loading ? 'Processing...' : key === 0 ? 'Already Claimed' : 'Get started'}
                        </Button>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </SignedIn>

                )}
               
            </CardFooter>
        </Card>
    )
}

export default CardPlan