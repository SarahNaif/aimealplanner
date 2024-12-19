import { Button } from '@/components/ui/button'
import { plans } from '@/constants/index'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'


const page = () => {
    return (
        <div className="pt-24  bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <main className="  p-8">
                    <div className="space-y-8 my-9">
                        <div className="flex justify-between">
                            <div className="space-y-2 mt-3">
                                <h1 className="text-slate-800 text-4xl font-bold">Choose your AI Meal Planner plan</h1>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Select the perfect plan for your nutritional journey. Upgrade or downgrade anytime.
                                </p>
                            </div>
                        </div>
                        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {plans.map((plan, index) => (
                                <Card key={plan.name} className="flex flex-col justify-between border-2 hover:border-slate-600 transition-all duration-300 overflow-hidden">
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
                                        <Button
                                            className="w-full text-lg py-6 rounded-md"
                                            variant={index === 1 ? "default" : "outline"}
                                            disabled={index === 0 ? true : false}
                                        >
                                            {index === 0 ? "Already Claimed" : "Get started"}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>

    )
}

export default page