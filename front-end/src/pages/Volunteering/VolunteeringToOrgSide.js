import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";

function VolunteeringToOrgSide({ organizationId }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    const getApplication = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/volunteer-application`
        );
        console.log("all applications:", response.data);
        if (response.data) {
          setApplications(response.data);
        }
      } catch (error) {
        console.error("Error fetching the volunteer applications:", error);
        setError("Failed to fetch applications.");
      } finally {
        setLoading(false);
      }
    };

    getApplication();
  }, []);

  const renderStatus = (status) => {
    let statusColor = "text.gray";
    if (status === "PENDING") statusColor = "warning.main";
    if (status === "APPROVED") statusColor = "success.main";
    if (status === "REJECTED") statusColor = "error.main";

    return (
      <Typography variant="body2" fontWeight="bold" color={statusColor}>
        {status}
      </Typography>
    );
  };

  const handleStatusUpdate = async (appId, newStatus) => {
    try {
      await axios.post(`http://localhost:4000/volunteer-application/${appId}`, {
        status: newStatus,
        reviewedAt: new Date().toISOString(),
        organizationId: organizationId,
      });

      // Update the application list with the new status locally to reflect changes
      setApplications((prevApps) =>
        prevApps.map((app) =>
          app.id === appId
            ? {
                ...app,
                status: newStatus,
                reviewedAt: new Date().toISOString(),
              }
            : app
        )
      );
    } catch (error) {
      console.error("Error updating the application status:", error);
      setError("Failed to update application status.");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box maxWidth="lg" mx="auto" mt={4}>
      <Typography
        variant="h4"
        color="primary"
        align="center"
        gutterBottom
        fontWeight="bold"
      >
        Volunteering Applications
      </Typography>
      {applications.length === 0 ? (
        <Typography color="text.secondary" align="center">
          No applications found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {applications.map((app) => (
            <Grid item xs={12} key={app.id}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" color="primary">
                  Application ID: {app.id}
                </Typography>
                <Typography variant="body1">
                  <strong>Applicant Name:</strong> {app.user.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {app.user.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Location:</strong> {app.location}
                </Typography>
                <Typography variant="body1">
                  <strong>Skills:</strong> {app.skills}
                </Typography>
                <Typography variant="body1">
                  <strong>Education:</strong> {app.education}
                </Typography>
                <Typography variant="body1">
                  <strong>Preferred Areas:</strong> {app.preferredAreas}
                </Typography>
                <Typography variant="body1">
                  <strong>Previous Experience:</strong> {app.previousExperience}
                </Typography>
                <Typography variant="body1">
                  <strong>Availability:</strong> {app.availability}
                </Typography>
                <Typography variant="body1">
                  <strong>Languages:</strong> {app.languages}
                </Typography>
                <Typography variant="body1">
                  <strong>Emergency Contact:</strong> {app.emergencyContact}
                </Typography>
                <Typography variant="body1">
                  <strong>Motivation:</strong> {app.motivation}
                </Typography>
                <Typography variant="body1">
                  <strong>Certifications:</strong> {app.certifications}
                </Typography>
                <Typography variant="body1">
                  <strong>Additional Notes:</strong> {app.notes}
                </Typography>
                <Typography variant="body1">
                  <strong>Status:</strong> {renderStatus(app.status)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Submitted At:</strong>{" "}
                  {new Date(app.createdAt).toLocaleString()}
                </Typography>

                {/* Buttons for Accept and Decline */}
                {app.status === "PENDING" && (
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleStatusUpdate(app.id, "APPROVED")}
                      sx={{ mr: 2 }}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleStatusUpdate(app.id, "REJECTED")}
                    >
                      Decline
                    </Button>
                  </Box>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default VolunteeringToOrgSide;
