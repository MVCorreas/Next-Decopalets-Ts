
import { Metadata } from 'next'
import PlaceOrderForm from './PlaceOrderForm'

export const metadata: Metadata = {
  title: 'Place Order',
}

export default async function PlaceOrderPage() {
  return <PlaceOrderForm />
}
