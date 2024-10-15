import React, { createContext, useContext, useEffect, useState } from 'react';  

// Create the context  
const SearchContext = createContext();

// Create a provider component  
export const SearchProvider = ({ children }) => {  
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Start with false
    const [error, setError] = useState(null);

    const handleSearch = async (searchQuery) => {
        setIsLoading(true); // Set loading to true when search starts
        setQuery(searchQuery);
    
        try {
            // Use OpenStreetMap Nominatim for geocoding
            const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`;
            const response = await fetch(url);

            // Check if the response is okay (status in the range 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
    
            if (data.length > 0) {
                const { lat, lon } = data[0];
                setLocation({ lat: parseFloat(lat), lng: parseFloat(lon) });
            } else {
                alert('Location not found.');
            }
        } catch (error) {
            console.error("Error finding this location:", error);
            setError(error.message || "Failed to load location");
        } finally {
            setIsLoading(false); // Set loading to false in the end (success or failure)
        }
    };

    return (  
        <SearchContext.Provider value={{ query, location, handleSearch, isLoading, error }}>  
            {children}  
        </SearchContext.Provider>  
    );  
};  

// Create a custom hook for easy access to the context  
export const useSearch = () => {  
    return useContext(SearchContext);  
};
