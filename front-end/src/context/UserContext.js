import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';

// Create the context
const UsereContext = createContext();

// Create a provider component
export const UsereProvider = ({ children }) => {
  const { user } = useUser();
  const [contextUserType, setContextUserType] = useState(null);
  const [allUserData, setAllUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roleSelection, setRoleSelection] = useState(null); // State to store role selection

  useEffect(() => {
    let isMounted = true; // Track component mounted state

    const fetchUserType = async () => {
      if (user && isMounted) {
        try {
          const res = await axios.post('http://localhost:4000/check-user-type', {
            email: user.emailAddresses[0].emailAddress,
          });
          console.log("Type of user:", res);

          if (res.data.type === "unknown") {
            // If user is unknown, ask for role selection
            setRoleSelection(true);
          } else {
            setContextUserType(res.data.type);
            setAllUserData(res.data.userData);
            fetchDataBasedOnUserType(res.data.type); // Fetch data based on user type
          }
        } catch (err) {
          console.error('Error checking user type:', err);
          setError(err.response?.data?.message || "Failed to check user type");
          setLoading(false);
        }
      }
    };

    // Function to fetch data based on user type
    const fetchDataBasedOnUserType = async (type) => {
      let endpoint;
      switch (type) {
        case 'user':
          endpoint = 'http://localhost:4000/user';
          break;
        case 'organization':
          endpoint = 'http://localhost:4000/organiztions';
          break;
        case 'organizationMember':
          endpoint = 'http://localhost:4000/organiztion-members';
          break;
        case 'highLevelOrganization':
          endpoint = 'http://localhost:4000/higher-level-org';
          break;
        case 'decisionMaker':
          endpoint = 'http://localhost:4000/decision-maker';
          break;
        default:
          console.error('Unknown user type');
          return;
      }

      try {
        const response = await axios.get(endpoint);
        console.log(`Data for ${type}:`, response.data);
        // Handle the data according to your requirements here
      } catch (error) {
        console.error(`Error fetching data for ${type}:`, error);
        setError(error.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserType();

    return () => {
      isMounted = false; // Cleanup when unmounting
    };
  }, [user]);

  const handleRoleSelection = async (roleData) => {
    try {
      let apiEndpoint;
      switch (roleData.role) {
        case 'User':
          apiEndpoint = 'http://localhost:4000/user';
          break;
        case 'Organization':
          apiEndpoint = 'http://localhost:4000/organization';
          break;
        case 'OrganizationMember':
          apiEndpoint = 'http://localhost:4000/organization-member';
          break;
        case 'HighLevelOrganization':
          apiEndpoint = 'http://localhost:4000/high-level-organization';
          break;
        case 'DecisionMaker':
          apiEndpoint = 'http://localhost:4000/decision-maker';
          break;
        default:
          throw new Error('Invalid role selected');
      }

      // Prepare user data from Clerk
      const clerkData = {
        username: user.username,
        name: user.fullName,
        email: user.emailAddresses[0].emailAddress,
        createdAt: user.createdAt,
        imageUrl: user.imageUrl,
        password: user.passwordEnabled,
      };

      // Merge clerkData with roleData
      const dataToSend = { ...roleData, ...clerkData };

      // Make POST request with role and user data
      const res = await axios.post(apiEndpoint, dataToSend);
      setContextUserType(roleData.role); // Set the selected role as userType
      setLoading(false);
      setRoleSelection(false); // Hide role selection form after successful submission
    } catch (err) {
      console.error('Error creating user based on role:', err);
      setError(err.response?.data?.message || "Failed to create user with selected role");
    }
  };

  return (
    <UsereContext.Provider value={{ contextUserType, setContextUserType, allUserData, loading, error, roleSelection, handleRoleSelection }}>
      {children}
    </UsereContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useUserType = () => {
  return useContext(UsereContext);
};
