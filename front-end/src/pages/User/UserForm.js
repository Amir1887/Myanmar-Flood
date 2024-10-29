import React, { useState } from "react";
import { useUserType } from "../../context/UserContext";
import { Card, CardContent, Typography, Box } from '@mui/material';

function UserForm() {
  const { handleRoleSelection, contextUserType, allUserData, allOrgData, loading, error } = useUserType(); // Use context's handleRoleSelection
  console.log("frontend user data", allUserData)
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the data to submit based on userType
    const formData = {
      ...userData,
      ...(userType !== "User" && {
        isInNeed: undefined,
        privacyAgreement: undefined,
      }),
    };
    // Pass form data to the context's handleRoleSelection
    handleRoleSelection(formData);
    console.log("Submitting Form Data:", formData);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

    // Render the user data if available
// User Details Component
if (contextUserType && allUserData) {
  return (
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
  );
}

if (contextUserType && allOrgData) {
  return (
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
  );
}

  
    // Render the form if user data is not fully available or needs to be updated

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg shadow-inner">
      {/* User Type Selection */}
      <select
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
      >
        <option value="">Select User Type</option>
        <option value="User">Ordinary User</option>
        <option value="Organization">Organization</option>
        <option value="OrganizationMember">Organization Member</option>
        <option value="HighLevelOrganization">High Level Organization</option>
        <option value="DecisionMaker">Decision Maker</option>
      </select>

      {/* UserType-based inputs */}
      {userType === "User" && (
        <>
          <input
            type="text"
            name="location"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            placeholder="Location"
            value={userData.location}
            onChange={handleChange}
          />
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="isInNeed"
                className="form-checkbox"
                checked={userData.isInNeed}
                onChange={handleChange}
              />
              <span className="ml-2">Are you currently in need of help?</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="privacyAgreement"
                className="form-checkbox"
                checked={userData.privacyAgreement}
                onChange={handleChange}
              />
              <span className="ml-2">Agree to privacy terms and conditions?</span>
            </label>
          </div>
        </>
      )}

      {userType === "Organization" && (
        <>
          <input
            type="text"
            name="phoneNumber"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            placeholder="Phone Number"
            value={userData.phoneNumber}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            placeholder="Location"
            value={userData.location}
            onChange={handleChange}
          />
          <input
            type="text"
            name="highLevelOrg"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            placeholder="Related High-Level Organization"
            value={userData.highLevelOrg}
            onChange={handleChange}
          />
        </>
      )}

      {userType === "OrganizationMember" && (
        <>
          <input
            type="text"
            name="role"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            placeholder="Role in Organization"
            value={userData.role}
            onChange={handleChange}
          />
          <input
            type="text"
            name="organization"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            placeholder="Organization"
            value={userData.organization}
            onChange={handleChange}
          />
        </>
      )}

      {userType === "DecisionMaker" && (
        <>
          <input
            type="text"
            name="role"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            placeholder="Decision Maker Role"
            value={userData.role}
            onChange={handleChange}
          />
          <input
            type="text"
            name="highLevelOrg"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            placeholder="High-Level Organization"
            value={userData.highLevelOrg}
            onChange={handleChange}
          />
        </>
      )}

      {userType === "HighLevelOrganization" && (
        <>
          <input
            type="text"
            name="name"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            placeholder="High Level Organization Name"
            value={userData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="region"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            placeholder="Operating Region"
            value={userData.region}
            onChange={handleChange}
          />
        </>
      )}

      {/* Submit Button */}
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg">
        Submit
      </button>
    </form>
  );
}

export default UserForm;
