import { SignUp } from '@clerk/clerk-react'

export default function SignUpPage() {
  return (
    <div className='flex items-center justify-center p-4'>
      <SignUp path="/sign-up" />
    </div>
  )
}