import React from 'react';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { useUserType } from '../context/UserContext';
import { Card, CardContent, Typography, Box, Avatar, Stack, Divider, AppBar, Toolbar } from '@mui/material';
// import { Container, Typography, Button,  } from "@mui/material";
const ProfilePage = () => {
  const { user, isLoaded } = useUser();
  const { contextUserType, allUserData, allOrgData } = useUserType();

  if (!isLoaded) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (!user) {
    return <Typography variant="h6" align="center">You need to be logged in to view this page.</Typography>;
  }

  const isUser = contextUserType === 'user' && allUserData;
  const isOrg = contextUserType === 'organization' && allOrgData;

  return (
    <Box p={3} display="flex" flexDirection="column" alignItems="center">
            {/* Header with AppBar */}
            <AppBar
        position="static"
        color="primary"
        style={{
          marginTop: "20px",
          width: "25%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Toolbar style={{ justifyContent: "center" }}>
          {" "}
          {/* Center the content in the Toolbar */}
          <Typography variant="h4" align="center">
            {" "}
            {/* Center the text within Typography */}
            Your Profile
          </Typography>
        </Toolbar>
      </AppBar>

      <Card variant="outlined" sx={{ maxWidth: 600, width: '100%', mt: 3 }}>
      <CardContent>
  <Stack direction="row" spacing={2} alignItems="center">
    {/* Aligns the UserButton/Sign-In Link and Username */}
    <SignedIn>
      <UserButton />
    </SignedIn>
    <SignedOut>
      <Link to="/sign-in">Sign In</Link>
    </SignedOut>
    <Typography variant="h6">username: {user.username || 'No username provided'}</Typography>
  </Stack>

  <Box mt={2}>
    <Typography variant="body1">
      <strong>Email:</strong> {user.primaryEmailAddress.emailAddress}
    </Typography>
  </Box>

  <Divider sx={{ my: 3 }} />

  {(isUser || isOrg) && (
    <Box>
      <Typography variant="h5" component="div" gutterBottom>
        {isUser ? 'User Details' : 'Organization Details'}
      </Typography>

      <Box mt={2}>
        <Typography variant="body1"><strong>Name:</strong> {isUser ? allUserData.name : allOrgData.name || "N/A"}</Typography>
        <Typography variant="body1"><strong>Email:</strong> {isUser ? allUserData.email : allOrgData.email}</Typography>
        <Typography variant="body1"><strong>Location:</strong> {isUser ? allUserData.location : allOrgData.location || "N/A"}</Typography>
        <Typography variant="body1"><strong>Phone Number:</strong> {isUser ? allUserData.phoneNumber : allOrgData.phoneNumber || "N/A"}</Typography>

        {isUser ? (
          <>
            <Typography variant="body1"><strong>Role:</strong> {allUserData.role}</Typography>
            <Typography variant="body1"><strong>In Need of Help:</strong> {allUserData.isInNeed ? "Yes" : "No"}</Typography>
            <Typography variant="body1"><strong>Privacy Agreement:</strong> {allUserData.privacyAgreement ? "Agreed" : "Not Agreed"}</Typography>
          </>
        ) : (
          <>
            <Typography variant="body1"><strong>Created At:</strong> {allOrgData.createdAt ? new Date(allOrgData.createdAt).toLocaleString() : "N/A"}</Typography>
          </>
        )}
      </Box>
    </Box>
  )}
</CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
