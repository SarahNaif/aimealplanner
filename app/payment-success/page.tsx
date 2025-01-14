"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreditStore } from '@/store/creditStore';
import { Check, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Page: React.FC = () => {
  const SearchParams = useSearchParams()
  const  userId  = SearchParams.get('userId');; 
  const { credits, plan } = useCreditStore();
   
  return (
<div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto my-4 bg-green-100 text-green-600 rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <Check className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your payment has been processed successfully.
          </p>
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <CreditCard className="w-5 h-5" />
            <span>Your know {plan} member</span>
          </div>
          <div className="mt-4 text-lg font-semibold">
            Credits: {credits}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="w-full max-w-xs">
            <Link href="/meal-planner">Generate Recipe&apos;s</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Page