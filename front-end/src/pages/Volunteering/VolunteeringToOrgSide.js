import axios from "axios";
import React, { useEffect, useState } from "react";

function VolunteeringToOrgSide() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const getApplication = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/volunteer-application`
        );
        console.log("all app.....", response.data); // Combined application + user data
        if (response.data) {
          setApplications(response.data);
        }
      } catch (error) {
        console.error("Error fetching the volunteer application:", error);
      }
    };

    getApplication();
  }, []);

  return (
    <div>
      <h1>Volunteering Applications</h1>
      {applications.map((app) => (
        <div key={app.id}>
          <p>Application ID: {app.id}</p>
          <p>Applicant Name: {app.user.name}</p> {/* Access user details */}
          <p>Location: {app.location}</p>
          <p>Skills: {app.skills}</p>
          <p>Status: {app.status}</p>
        </div>
      ))}
    </div>
  );
}

export default VolunteeringToOrgSide;
