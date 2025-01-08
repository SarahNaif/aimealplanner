
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { connectToDatabase } from '@/lib/database/mongodb'
import CreditModel from '@/lib/database/models/Credit'

export async function POST(req: Request) {
 
  const CLERK_SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET

  if (!CLERK_SIGNING_SECRET) {
    throw new Error('Error: The CLERK_SIGNING_SECRET is missing')
  }

 
  const wh = new Webhook(CLERK_SIGNING_SECRET)

 
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

 
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }


  const payload = await req.json()
  const body = JSON.stringify(payload)


  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  const { id: userId } = evt.data
  const eventType = evt.type

  if (eventType === 'user.created') {
  
    try {
      await connectToDatabase()

      
      const existingCredit = await CreditModel.findOne({ userId })
      if (!existingCredit) {
        await CreditModel.create({
          userId,
          credits: 2,  
          plan: 'Free', 
          lastUpdated: new Date(),
        })
      }
    } catch (error) {
      console.error('Error initializing user credits:', error)
    }
  }

  
  return new Response('Webhook received', { status: 200 })
}
