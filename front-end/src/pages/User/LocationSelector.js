import React, { useState, useEffect } from 'react';  
import { useUserLocation } from '../../context/UserLocationContext';  

const LocationSelector = () => {  
  const { setUserLocation, userLocation } = useUserLocation();  
  const [locationError, setLocationError] = useState(null);  
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);  
  const [showLocationPrompt, setShowLocationPrompt] = useState(true); // State to control the modal visibility

  const requestLocation = () => {  
    setIsRequestingLocation(true);  
    setLocationError(null); // Reset any previous errors  

    if ("geolocation" in navigator) {  
      navigator.geolocation.getCurrentPosition(  
        (position) => {  
          const { latitude, longitude } = position.coords;  
          setUserLocation({ latitude, longitude });  
          setIsRequestingLocation(false); // Reset the requesting state  
          setShowLocationPrompt(false); // Hide the modal after success  
        },  
        (error) => {  
          setLocationError("Location access denied. Please enable location services.");  
          console.error("Error getting location: ", error);  
          setIsRequestingLocation(false); // Reset the requesting state  
        }  
      );  
    } else {  
      setLocationError("Geolocation is not supported by your browser.");  
      setIsRequestingLocation(false); // Reset the requesting state  
    }  
  };  

  // Conditional rendering based on state  
  let statusMessage;  
  if (locationError) {  
    statusMessage = <p className="text-red-500">{locationError}</p>;  
  } else if (userLocation) {  
    statusMessage = (  
      <p className="text-green-500">  
        Location successfully obtained: {userLocation.latitude}, {userLocation.longitude}  
      </p>  
    );  
  } else if (isRequestingLocation) {  
    statusMessage = <p>Attempting to detect your location...</p>;  
  } else {  
    statusMessage = <p>Please allow access to your location.</p>;  
  }  

  return (  
    <div className="p-4">  
      {showLocationPrompt && (  
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">  
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">  
            <h2 className="text-xl font-bold mb-4">Location Access Needed</h2>  
            {statusMessage}  
            {!userLocation && !isRequestingLocation && (  
              <button   
                onClick={requestLocation}   
                className="mt-4 bg-blue-500 text-white rounded-lg p-2"  
              >  
                Allow Location Access  
              </button>  
            )}  
            <button   
              onClick={() => setShowLocationPrompt(false)}   
              className="mt-4 bg-gray-500 text-white rounded-lg p-2"  
            >  
              Dismiss  
            </button>  
          </div>  
        </div>  
      )}  
    </div>  
  );  
};  

export default LocationSelector;
