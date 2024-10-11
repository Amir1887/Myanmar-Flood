import {  SignOutButton, useAuth } from '@clerk/clerk-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const {isSignedIn} = useAuth()
  const classes = 'px-4 py-2 hover:text-black hover:underline hover:bg-blue-300 rounded-xl'
  return (
    <div className='flex items-center justify-center text-primary-dark'>
      <ul className='flex  items-center gap-8  text-primary text-xl '>
          <li className={classes}><Link to={"/dashboard/profile"}>Profile</Link></li>
          <li className={classes}><Link to={"/about"}>About</Link></li>
          <li className={classes}><Link to={"/contact"}>Contact</Link></li>
          {isSignedIn && (
            <SignOutButton className={classes}/>
          )}

          {!isSignedIn && (
            <>
                      <li className={classes}><Link to={"/sign-in"}>Sign In</Link></li>
                      <li className={classes}><Link to={"/sign-up"}>Sign Up</Link></li>
            </>
          )}


        </ul>
    </div>
  )
}

export default Header
