import React from 'react';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { useUserType } from '../context/UserContext';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Volunteering from './Volunteering/VolunteeringUserSide';
import VolunteeringToOrgSide from './Volunteering/VolunteeringToOrgSide';

const ProfilePage = () => {
  const { user, isLoaded } = useUser();
  const {contextUserType, allUserData, allOrgData} = useUserType();
  console.log("userinfo..",user);
  console.log("all infoooo", allOrgData);
  console.log("userType..",contextUserType);
  let userId;
  if(allUserData){
     userId = allUserData.id;
  }
  
  let organizationId;
  if(allOrgData){
    organizationId = allOrgData.id;
  }
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

    {(contextUserType && allUserData)? (
      <div>
              <Card variant="outlined" sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom color="primary">
          User Details
        </Typography>
        <Box>
          <Typography variant="body1"><strong>Name:</strong> {allUserData.name || "N/A"}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {allUserData.email}</Typography>
          <Typography variant="body1"><strong>Location:</strong> {allUserData.location || "N/A"}</Typography>
          <Typography variant="body1"><strong>Role:</strong> {allUserData.role}</Typography>
          <Typography variant="body1"><strong>Phone Number:</strong> {allUserData.phoneNumber || "N/A"}</Typography>
          <Typography variant="body1"><strong>In Need of Help:</strong> {allUserData.isInNeed ? "Yes" : "No"}</Typography>
          <Typography variant="body1"><strong>Privacy Agreement:</strong> {allUserData.privacyAgreement ? "Agreed" : "Not Agreed"}</Typography>
        </Box>
      </CardContent>
    </Card>
      </div>
    ):null}
    {(contextUserType && allOrgData)? (
      <div>
   <Card variant="outlined" sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom color="secondary">
          Organization Details
        </Typography>
        <Box>
          <Typography variant="body1"><strong>Name:</strong> {allOrgData.name || "N/A"}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {allOrgData.email}</Typography>
          <Typography variant="body1"><strong>Location:</strong> {allOrgData.location || "N/A"}</Typography>
          <Typography variant="body1"><strong>Phone Number:</strong> {allOrgData.phoneNumber || "N/A"}</Typography>
          <Typography variant="body1"><strong>Created At:</strong> {allOrgData.createdAt ? new Date(allOrgData.createdAt).toLocaleDateString() + ' ' + new Date(allOrgData.createdAt).toLocaleTimeString() : "N/A"}</Typography>
        </Box>
      </CardContent>
    </Card>
      </div>
    ):null}
    {contextUserType === "user" && <Volunteering userId={userId}/>}
    {contextUserType === "organization" && <VolunteeringToOrgSide organizationId={organizationId}/>}
    </div>
  );
};

export default ProfilePage;



