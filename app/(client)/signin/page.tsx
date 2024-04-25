import { Metadata } from 'next'
import SigInForm from './SignInForm'

export const metadata: Metadata = {
  title: 'Sign in',
}

export default async function Signin() {
  return <SigInForm />
}