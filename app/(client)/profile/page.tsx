import { Metadata } from 'next'
import ProfileForm from './ProfileForm'

export const metadata: Metadata = {
  title: 'Profile',
}

export default async function Profile() {
  return <ProfileForm />
}