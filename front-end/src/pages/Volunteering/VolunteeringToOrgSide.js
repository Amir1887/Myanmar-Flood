import axios from "axios";
import React, { useEffect, useState } from "react";

function VolunteeringToOrgSide({organizationId}) {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const getApplication = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/volunteer-application`);
        console.log("all applications:", response.data); 
        if (response.data) {
          setApplications(response.data);
        }
      } catch (error) {
        console.error("Error fetching the volunteer applications:", error);
      }
    };

    getApplication();
  }, []);

  const renderStatus = (status) => {
    let statusColor = "text-gray-600";
    if (status === "PENDING") statusColor = "text-yellow-500";
    if (status === "APPROVED") statusColor = "text-green-500";
    if (status === "REJECTED") statusColor = "text-red-500";
    return <span className={`font-semibold ${statusColor}`}>{status}</span>;
  };

  const handleStatusUpdate = async (appId, newStatus) => {
    try {
      await axios.post(`http://localhost:4000/volunteer-application/${appId}`, {
        status: newStatus,
        reviewedAt: new Date().toISOString(),
        organizationId:organizationId,
      });

      // Update the application list with the new status locally to reflect changes
      setApplications((prevApps) =>
        prevApps.map((app) =>
          app.id === appId ? { ...app, status: newStatus, reviewedAt: new Date().toISOString(), reviewedBy:"Organization name"  } : app
        )
      );
    } catch (error) {
      console.error("Error updating the application status:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-blue-50 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Volunteering Applications</h1>
      <div className="space-y-6">
        {applications.length === 0 ? (
          <p className="text-center text-blue-600">No applications found.</p>
        ) : (
          applications.map((app) => (
            <div key={app.id} className="p-4 bg-white rounded-lg shadow-md">
              <p className="text-lg font-semibold text-blue-700 mb-2">Application ID: {app.id}</p>
              <p><strong>Applicant Name:</strong> {app.user.name}</p>
              <p><strong>Email:</strong> {app.user.email}</p>
              <p><strong>Location:</strong> {app.location}</p>
              <p><strong>Skills:</strong> {app.skills}</p>
              <p><strong>Education:</strong> {app.education}</p>
              <p><strong>Preferred Areas:</strong> {app.preferredAreas}</p>
              <p><strong>Previous Experience:</strong> {app.previousExperience}</p>
              <p><strong>Availability:</strong> {app.availability}</p>
              <p><strong>Languages:</strong> {app.languages}</p>
              <p><strong>Emergency Contact:</strong> {app.emergencyContact}</p>
              <p><strong>Motivation:</strong> {app.motivation}</p>
              <p><strong>Certifications:</strong> {app.certifications}</p>
              <p><strong>Additional Notes:</strong> {app.notes}</p>
              <p><strong>Status:</strong> {renderStatus(app.status)}</p>
              <p><strong>Submitted At:</strong> {new Date(app.createdAt).toLocaleString()}</p>

              {/* Buttons for Accept and Decline */}
              <div className="mt-4">
                {app.status === "PENDING" && (
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleStatusUpdate(app.id, "APPROVED")}
                      className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(app.id, "REJECTED")}
                      className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default VolunteeringToOrgSide;
