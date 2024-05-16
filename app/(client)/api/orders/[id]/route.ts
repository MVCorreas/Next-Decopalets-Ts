import dbConnect from '@/lib/dbConnect'
import OrderModel from '@/lib/models/OrderModel'
import { auth } from '@/lib/auth'

export const GET = auth(async (...request: any) => {
  const [req, { params }] = request
  
  console.log('Request:', request); // Log the entire request object to inspect its structure
  console.log('Params:', params); // Log the params object to see if the order ID is being correctly passed
  
  if (!req.auth) {
    console.log('User not authenticated'); // Log a message if the user is not authenticated
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }
  
  await dbConnect()
  console.log('Connected to database'); // Log a message when successfully connected to the database
  
  const order = await OrderModel.findById(params.id)
  console.log('Retrieved Order:', order); // Log the retrieved order to see if it exists
  
  return Response.json(order)
}) as any
