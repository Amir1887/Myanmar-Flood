import * as React from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useUserType } from '../context/UserContext';


//This component is designed for authenticated users
export default function DashboardLayout() {
  const { contextUserType,  roleSelection } = useUserType(); 
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/sign-in');
    }
    if (roleSelection && contextUserType === null) {
      navigate('/dashboard/user-form');
    }
  }, [ contextUserType,  roleSelection, navigate]);

  if (!isLoaded) return <div>Loading...</div>;
  if (!userId) return <div>Please sign in...</div>;

  return <Outlet />;  // Proper JSX here
}