import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Alert,
} from '@mui/material';

function Volunteering({ userId }) {
  const [application, setApplication] = useState(null);
  const [skills, setSkills] = useState('');
  const [education, setEducation] = useState('');
  const [preferredAreas, setPreferredAreas] = useState('');
  const [previousExperience, setPreviousExperience] = useState('');
  const [availability, setAvailability] = useState('');
  const [languages, setLanguages] = useState('');
  const [location, setLocation] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [motivation, setMotivation] = useState('');
  const [certifications, setCertifications] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (userId) {
      const getApplication = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/volunteer-application/${userId}`);
          console.log("response from userSide", response);
          if (response.data) {
            setApplication(response.data);
          }
        } catch (error) {
          console.error("Error fetching the volunteer application:", error);
        }
      };
      getApplication();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const volunteerApplication = {
      userId,
      skills,
      education,
      preferredAreas,
      previousExperience,
      availability,
      languages,
      location,
      emergencyContact,
      motivation,
      certifications,
      notes,
    };

    try {
      const response = await fetch('http://localhost:4000/volunteer-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(volunteerApplication),
      });

      if (response.ok) {
        setApplication(volunteerApplication);
        setMessage('Your application has been submitted successfully.');
      } else {
        setMessage('Failed to submit the application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting the application:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  const renderStatus = () => {
    if (!application) return null;
    const { status } = application;
    let statusColor = 'text-gray-600';
    if (status === 'PENDING') statusColor = 'warning';
    if (status === 'APPROVED') statusColor = 'success';
    if (status === 'REJECTED') statusColor = 'error';

    return (
      <Typography color={statusColor} fontWeight="bold">
        Status: {status}
      </Typography>
    );
  };

  return (
    <Box maxWidth="md" mx="auto" mt={4} p={4} boxShadow={3} borderRadius={2} bgcolor="background.paper">
      <Typography variant="h4" color="primary" align="center" gutterBottom>
        Volunteer Application Form
      </Typography>
      {message && <Alert severity="info" sx={{ mb: 2 }}>{message}</Alert>}

      {application ? (
        <Box>
          <Typography variant="h5" color="primary" gutterBottom>
            Your Volunteer Application
          </Typography>
          {renderStatus()}
          <Typography><strong>Skills:</strong> {application.skills}</Typography>
          <Typography><strong>Education:</strong> {application.education}</Typography>
          <Typography><strong>Preferred Areas:</strong> {application.preferredAreas}</Typography>
          <Typography><strong>Previous Experience:</strong> {application.previousExperience}</Typography>
          <Typography><strong>Availability:</strong> {application.availability}</Typography>
          <Typography><strong>Languages:</strong> {application.languages}</Typography>
          <Typography><strong>Location:</strong> {application.location}</Typography>
          <Typography><strong>Emergency Contact:</strong> {application.emergencyContact}</Typography>
          <Typography><strong>Motivation:</strong> {application.motivation}</Typography>
          <Typography><strong>Certifications:</strong> {application.certifications}</Typography>
          <Typography><strong>Notes:</strong> {application.notes || "No Notes"}</Typography>
          <Typography><strong>Reviewed By:</strong> {application.organization.name}</Typography>
          <Typography><strong>Reviewer Email:</strong> {application.organization.email}</Typography>
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Skills (comma-separated)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Preferred Areas (comma-separated)"
                value={preferredAreas}
                onChange={(e) => setPreferredAreas(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Previous Experience"
                multiline
                value={previousExperience}
                onChange={(e) => setPreviousExperience(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Availability"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Languages (comma-separated)"
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Emergency Contact"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Motivation"
                multiline
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Certifications (optional)"
                value={certifications}
                onChange={(e) => setCertifications(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Notes"
                multiline
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit Application
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Box>
  );
}

export default Volunteering;
