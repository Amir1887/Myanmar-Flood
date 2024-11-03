import React, { useState, useEffect } from 'react';
import { useUserLocation } from '../../context/UserLocationContext';
import { Box, Button, Modal, Typography, CircularProgress } from '@mui/material';

const LocationSelector = () => {
  const { setUserLocation, userLocation } = useUserLocation();
  const [locationError, setLocationError] = useState(null);
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);

  const requestLocation = () => {
    setIsRequestingLocation(true);
    setLocationError(null);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setIsRequestingLocation(false);
          setShowLocationPrompt(false);
        },
        (error) => {
          setLocationError("Location access denied. Please enable location services.");
          setIsRequestingLocation(false);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
      setIsRequestingLocation(false);
    }
  };

  useEffect(() => {
    if (userLocation) {
      const { latitude, longitude } = userLocation;
      fetch("http://localhost:4000/weather-data-from-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ latitude, longitude }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch weather data");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Weather data fetched successfully:", data);
        })
        .catch((error) => {
          console.error("Error sending location data to backend:", error);
        });
    }
  }, [userLocation]);

  let statusMessage;
  if (locationError) {
    statusMessage = <Typography color="error">{locationError}</Typography>;
  } else if (userLocation) {
    statusMessage = (
      <Typography color="success.main">
        Location successfully obtained: {userLocation.latitude}, {userLocation.longitude}
      </Typography>
    );
  } else if (isRequestingLocation) {
    statusMessage = (
      <Box display="flex" alignItems="center">
        <CircularProgress size={20} />
        <Typography ml={1}>Attempting to detect your location...</Typography>
      </Box>
    );
  } else {
    statusMessage = <Typography>Please allow access to your location.</Typography>;
  }

  return (
    <Box p={2}>
      {showLocationPrompt && (
        <Modal
          open={showLocationPrompt}
          onClose={() => setShowLocationPrompt(false)}
          aria-labelledby="location-modal-title"
          aria-describedby="location-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              maxWidth: 400,
              textAlign: 'center',
            }}
          >
            <Typography id="location-modal-title" variant="h6" mb={2}>
              Location Access Needed
            </Typography>
            {statusMessage}
            {!userLocation && !isRequestingLocation && (
              <Button
                variant="contained"
                color="primary"
                onClick={requestLocation}
                sx={{ mt: 2, mr: 1 }}
              >
                Allow Location Access
              </Button>
            )}
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setShowLocationPrompt(false)}
              sx={{ mt: 2 }}
            >
              Dismiss
            </Button>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default LocationSelector;
