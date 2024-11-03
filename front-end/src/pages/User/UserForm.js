import React, { useState } from "react";
import axios from "axios";
import { useUserType } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Box, Button, TextField, Typography, Select, MenuItem, AppBar,  Toolbar } from "@mui/material";
import ProfilePage from "../ProfilePage";
function UserForm() {
  const {
    contextUserType,
    setContextUserType,
    allUserData,
    allOrgData,
    loading,
    setLoading,
    error,
    setError,
    roleSelection,
    setRoleSelection,
  } = useUserType(); // Use context's handleRoleSelection
  const { user } = useUser();
  console.log("frontend role", roleSelection);
  console.log("frontend role", roleSelection);
  console.log("frontend contextUserType", contextUserType);
  console.log("frontend allUserData", allUserData);
  console.log("frontend allOrgData", allOrgData);

  // Prepare user data from Clerk
  const clerkData = {
    username: user.username,
    name: user.fullName,
    email: user.emailAddresses[0].emailAddress,
    createdAt: user.createdAt,
    imageUrl: user.imageUrl,
    password: user.passwordEnabled,
  };
  console.log("clerck data ", clerkData);
  const [userType, setUserType] = useState(""); // Initialize userType
  const [userData, setUserData] = useState({
    phoneNumber: "",
    password: "",
    location: "",
    isInNeed: false,
    privacyAgreement: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRoleSelection = async (roleData) => {
    try {
      let apiEndpoint;
      switch (roleData.role) {
        case "User":
          apiEndpoint = "http://localhost:4000/user";
          break;
        case "Organization":
          apiEndpoint = "http://localhost:4000/organiztions";
          break;
        case "OrganizationMember":
          apiEndpoint = "http://localhost:4000/organization-member";
          break;
        case "HighLevelOrganization":
          apiEndpoint = "http://localhost:4000/high-level-organization";
          break;
        case "DecisionMaker":
          apiEndpoint = "http://localhost:4000/decision-maker";
          break;
        default:
          throw new Error("Invalid role selected");
      }

      console.log("reole data from context ", roleData);

      // Merge clerkData with roleData
      const dataToSend = { ...roleData, ...clerkData };
      console.log("all sent data", dataToSend);

      // Make POST request with role and user data
      const res = await axios.post(apiEndpoint, dataToSend);
      setContextUserType(roleData.role); // Set the selected role as userType
      setLoading(false);
      setRoleSelection(false); // Hide role selection form after successful submission
    } catch (err) {
      console.error("Error creating user based on role:", err);
      setError(
        err.response?.data?.message 
      );
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare the data to submit based on userType
    const formData = {
      role: userType, 
      ...userData,
      ...(userType !== "User" && {
        isInNeed: undefined,
        privacyAgreement: undefined,
      }),
    };
    // Pass form data to the context's handleRoleSelection
    await handleRoleSelection(formData);
    console.log("Submitting Form Data:", formData);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      {roleSelection && (
        <Box maxWidth={500} width="100%" textAlign="center">
      {/* Header with AppBar */}
      <AppBar
        position="static"
        color="primary"
        style={{
          marginTop: "20px",
          width: "80%",
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
            Complete Your SignIn
          </Typography>
        </Toolbar>
      </AppBar>
          <form onSubmit={handleSubmit} style={{ maxWidth: '100%' }}>
            <Select
              fullWidth
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              displayEmpty
              sx={{ mb: 3, mt: 3 }}
            >
              <MenuItem value="">
                <em>How Do You Like To Proceed?</em>
              </MenuItem>
              <MenuItem value="User">Ordinary User</MenuItem>
              <MenuItem value="Organization">Organization</MenuItem>
              <MenuItem value="OrganizationMember" disabled>
                Organization Member
              </MenuItem>
              <MenuItem value="HighLevelOrganization" disabled>
                High Level Organization
              </MenuItem>
              <MenuItem value="DecisionMaker" disabled>
                Decision Maker
              </MenuItem>
            </Select>

            {/* Render inputs based on the selected userType */}
            {userType === "User" && (
              <>
                <TextField
                  fullWidth
                  name="location"
                  label="Location"
                  value={userData.location}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  value={userData.phoneNumber}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                  <input
                    type="checkbox"
                    name="isInNeed"
                    checked={userData.isInNeed}
                    onChange={handleChange}
                  />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    Are you currently in need of help?
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                  <input
                    type="checkbox"
                    name="privacyAgreement"
                    checked={userData.privacyAgreement}
                    onChange={handleChange}
                  />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    Agree to privacy terms and conditions?
                  </Typography>
                </Box>
              </>
            )}
            {userType === "Organization" && (
              <>
                <TextField
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  value={userData.phoneNumber}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  name="location"
                  label="Location"
                  value={userData.location}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  name="highLevelOrg"
                  label="Related High-Level Organization"
                  value={userData.highLevelOrg}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              </>
            )}




{/* {userType === "HighLevelOrganization" && (
  <>
    <TextField
      fullWidth
      name="name"
      label="High Level Organization Name"
      variant="outlined"
      value={userData.name}
      onChange={handleChange}
      sx={{ mb: 2 }}
    />
    <TextField
      fullWidth
      name="region"
      label="Operating Region"
      variant="outlined"
      value={userData.region}
      onChange={handleChange}
      sx={{ mb: 2 }}
    />
  </>
)}

{userType === "OrganizationMember" && (
  <>
    <TextField
      fullWidth
      name="role"
      label="Role in Organization"
      variant="outlined"
      value={userData.role}
      onChange={handleChange}
      sx={{ mb: 2 }}
    />
    <TextField
      fullWidth
      name="organization"
      label="Organization"
      variant="outlined"
      value={userData.organization}
      onChange={handleChange}
      sx={{ mb: 2 }}
    />
  </>
)}

{userType === "DecisionMaker" && (
  <>
    <TextField
      fullWidth
      name="role"
      label="Decision Maker Role"
      variant="outlined"
      value={userData.role}
      onChange={handleChange}
      sx={{ mb: 2 }}
    />
    <TextField
      fullWidth
      name="highLevelOrg"
      label="High-Level Organization"
      variant="outlined"
      value={userData.highLevelOrg}
      onChange={handleChange}
      sx={{ mb: 2 }}
    />
  </>
)} */}


            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Submit
            </Button>
          </form>
        </Box>
      )}

  
    </Box>
    {contextUserType && <ProfilePage />}
    </>
  );
}


export default UserForm;
