import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';  
import { useUser } from '@clerk/clerk-react';


// Create the context  
const UsereContext = createContext();  

// Create a provider component  
export const UsereProvider = ({ children }) => {  
    const { user } = useUser();
    const [userType, setUserType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

      
    useEffect(() => {
      let isMounted = true; // Track component mounted state
      const fetchUserType = async () => {
        if (user && isMounted) {
          try {
            const res = await axios.post('http://localhost:4000/check-user-type', {
                email: user.emailAddresses[0].emailAddress,
              });
            console.log("type of user:",res);
            setUserType(res.data.type);
            setLoading(false);
          } catch (err) {
            console.error('Error checking user type:', error);
            setError(err.response?.data?.message || "Failed to check user type");
            setLoading(false);
          }
        }
      };
      fetchUserType();
    
      return () => {
        isMounted = false; // Cleanup when unmounting
      };
    }, [user]);
    return (  
      <UsereContext.Provider value={{userType, loading,  error}}>  
        {children}  
      </UsereContext.Provider>  
    );  
  };  
  
  // Create a custom hook for easy access to the context  
  export const useUserType = () => {  
    return useContext(UsereContext);  
  };