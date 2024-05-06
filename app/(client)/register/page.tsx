import { Metadata } from 'next'
import RegisterForm from './RegisterForm'

export const metadata: Metadata = {
  title: 'Register',
}

export default async function Register() {
  return <RegisterForm />
}