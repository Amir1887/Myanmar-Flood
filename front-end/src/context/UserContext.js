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
  const [allOrgData, setAllOrgData] = useState(null);
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
            setLoading(false);
          } else {
            setContextUserType(res.data.type);
            setAllUserData(res.data.userData);
            setAllOrgData(res.data.orgData);
            setRoleSelection(false); // Hide role selection if user type is known
            fetchDataBasedOnUserType(res.data.type); // Fetch data based on user type
            setLoading(false);
          }
        } catch (err) {
          console.error('Error checking user type:', err);
          setError(err.response?.data?.message || "Failed to check user type");
          setLoading(false);
        }
      }
    };
    console.log("Role Selection after fetching user type:", roleSelection);  
    console.log("Context User Type after fetching:", contextUserType);  
    console.log("All User Data after fetch:", allUserData);  
    console.log("All Org Data after fetch:", allOrgData); 
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
        console.log(`Data for All ${type}s:`, response.data);
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



  return (
    <UsereContext.Provider value={{ contextUserType, setContextUserType, allUserData, allOrgData,  loading, setLoading,  error, setError,  roleSelection, setRoleSelection }}>
      {children}
    </UsereContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useUserType = () => {
  return useContext(UsereContext);
};


