import { Metadata } from 'next'
import ShippingForm from './ShippingForm'

export const metadata: Metadata = {
  title: 'Register',
}

export default async function Register() {
  return <ShippingForm />
}