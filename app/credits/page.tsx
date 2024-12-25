import { plans } from '@/constants/index'
import CardPlan from '@/components/shared/Card/CardPlan'
import { useAuth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'


const Page : React.FC = () => {
const {userId} = useAuth()
if (!userId) redirect("/sign-in");
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
                                <CardPlan key={index} plan={plan} userId={userId} />
                               
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>

    )
}

export default Page