import React, { Suspense } from "react";
import { useUserType } from "./context/UserContext";

const UserDashboard = React.lazy(() => import("./UserDashboard"));
const OrganizationDashboard = React.lazy(() => import("./OrganizationDashboard"));
const HighLevelOrganizationDashboard = React.lazy(() => import("./HighLevelOrganizationDashboard"));

function DashboardCheck() {
  const { userType, loading, error } = useUserType();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      {userType === "user" && <UserDashboard />}
      {userType === "organization" && <OrganizationDashboard />}
      {userType === "highLevelOrganization" && <HighLevelOrganizationDashboard />}
      {userType === "unknown" && <div>User type not recognized. Please contact support.</div>}
    </Suspense>
  );
}
