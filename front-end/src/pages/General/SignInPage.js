import { SignIn } from '@clerk/clerk-react'

export default function SignInPage() {
  return(
    <div className='flex items-center justify-center p-4'>
       <SignIn path="/sign-in" />
    </div>
  )
}