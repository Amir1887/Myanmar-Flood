import React, { useState } from "react";
import { Button, Box, Typography, Stack } from "@mui/material";
import OrgPosts from "./OrganizationPosts/OrgPosts";
import UserPosts from "./UserPosts/UserPosts";
import OrganizationPosts from "./OrganizationPosts";
import UserPostsAll from "./UserPostsAll";
import { useUserType } from "../../context/UserContext";
function AllPosts() {
  const [activeSection, setActiveSection] = useState(null);
  const { contextUserType, allUserData, allOrgData } = useUserType();

  console.log("contextUserType", contextUserType);
  console.log("allUserData", allUserData);
  console.log("allOrgData", allOrgData);

  let userId = allUserData ? allUserData.id : null;
  let orgId = allOrgData ? allOrgData.id : null;

  function DisplayTest() {
    setActiveSection(
      <OrganizationPosts
        contextUserType={contextUserType}
        orgId={orgId}
        userId={userId}
        currentSection="OrganizationPosts"
      />
    );
  }

  function DisplayUserPosts() {
    setActiveSection(
      <UserPostsAll
        contextUserType={contextUserType}
        userId={userId}
        orgId={orgId}
        currentSection="UserPostsAll"
      />
    );
  }

  // Function to display Organization Posts with props
  // function DisplayOrg() {
  //   setActiveSection(<OrgPosts orgId={orgId} />);
  // }

  // Function to display User Posts with props
  // function DisplayUser() {
  //   setActiveSection(<UserPosts userId={userId} />);
  // }
  // Function to display User Posts with props
  // {
    /* <button onClick={DisplayOrg}>Organizations Updates</button>
      <button onClick={DisplayUser}>User Discussion</button> */
  // }
  return (
    <Box p={4} sx={{ textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        All Updates
      </Typography>

      <Stack direction="row" justifyContent="center" spacing={2} mt={2} mb={4}>
        <Button
          onClick={DisplayTest}
          variant="contained"
          color="primary"
          sx={{ minWidth: "150px", fontWeight: "bold" }}
        >
          Organization Updates
        </Button>
        <Button
          onClick={DisplayUserPosts}
          variant="contained"
          color="secondary"
          sx={{ minWidth: "150px", fontWeight: "bold" }}
        >
          User Discussion
        </Button>
      </Stack>

      <Box
        sx={{
          mt: 4,
          borderRadius: 2,
          boxShadow: 3,
          p: 3,
          bgcolor: "background.paper",
        }}
      >
        {activeSection ? (
          activeSection
        ) : (
          <Typography variant="body1" color="textSecondary">
            Select a section to view Updates
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default AllPosts;
