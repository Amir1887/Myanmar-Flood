import React from 'react';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user, isLoaded } = useUser();
  // console.log("userinfo..",user);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>You need to be logged in to view this page.</div>;
  }

  return (
    <div>
      
      <h1 className="text-3xl ml-2 mt-4">Your Profile</h1>

    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-6 flex gap-2 ">
        <p className="text-xl font-semibold">Name:</p>
        <p className="text-xl">{user.username || 'No name provided'}</p>

            <div className="w-12 h-12" >
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link to="/sign-in">Sign In</Link>
            </SignedOut>
            </div>
                    
      </div>
      <div className="mb-6">
        <p className="text-xl font-semibold">Email:</p>
        <p className="text-lg">{user.primaryEmailAddress.emailAddress}</p>
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;



