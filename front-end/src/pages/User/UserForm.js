import React, { useState } from "react";
import axios from "axios";
import { useUserType } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
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
  // console.log("frontend role", roleSelection);
  // console.log("frontend role", roleSelection);
  // console.log("frontend contextUserType", contextUserType);
  // console.log("frontend allUserData", allUserData);
  // console.log("frontend allOrgData", allOrgData);

  // Prepare user data from Clerk
  const clerkData = {
    username: user.username,
    name: user.fullName,
    email: user.emailAddresses[0].emailAddress,
    createdAt: user.createdAt,
    imageUrl: user.imageUrl,
    password: user.passwordEnabled,
  };
  // console.log("clerck data ", clerkData);
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
    <div>
      {roleSelection && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 p-4 bg-gray-50 rounded-lg shadow-inner"
        >
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
            <option value="HighLevelOrganization">
              High Level Organization
            </option>
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
                  <span className="ml-2">
                    Are you currently in need of help?
                  </span>
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
                  <span className="ml-2">
                    Agree to privacy terms and conditions?
                  </span>
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
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-lg"
          >
            Submit
          </button>
        </form>
      )}

      {contextUserType && (
        <Link to="/dashboard/profile" className="text-blue-600 hover:underline">
          See all your details
        </Link>
      )}
    </div>
  );
}

export default UserForm;
