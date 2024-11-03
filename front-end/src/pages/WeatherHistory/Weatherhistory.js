import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Dialog, Backdrop, Button, TextField, Container, Grid, AppBar, Toolbar } from '@mui/material';

function WeatherHistory() {
  const [weatherNotes, setWeatherNotes] = useState([]);
  const [filteredWeatherNotes, setFilteredWeatherNotes] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [message, setMessage] = useState('');
  const [selectedNote, setSelectedNote] = useState(null); // State for selected note

  useEffect(() => {
    const getWeatherHistory = async () => {
      try {
        const response = await axios.get('http://localhost:4000/weather-data');
        if (response.data) {
          setWeatherNotes(response.data);
          filterLastWeekData(response.data);
        }
      } catch (error) {
        console.error('Error fetching weather history:', error);
      }
    };
    getWeatherHistory();
  }, []);

  const filterLastWeekData = (data) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const filteredData = data.filter((item) => {
      const fetchedDate = new Date(item.fetchedAt);
      return fetchedDate >= oneWeekAgo && fetchedDate <= new Date();
    });
    setFilteredWeatherNotes(filteredData);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setMessage('');

    if (searchDate) {
      const filtered = weatherNotes.filter((note) => {
        const fetchedDate = new Date(note.fetchedAt).toLocaleDateString();
        return fetchedDate === new Date(searchDate).toLocaleDateString();
      });

      if (filtered.length > 0) {
        setFilteredWeatherNotes(filtered);
      } else {
        setMessage('No weather data recorded for this date.');
        setFilteredWeatherNotes([]);
      }
    }
  };

  const handleCardClick = (note) => {
    setSelectedNote(note);
  };

  const handleClose = () => {
    setSelectedNote(null);
  };

  return (
    <Container>
           <AppBar   
                position="static"   
                color="primary"   
                style={{ marginTop: '20px', width: '40%', marginLeft: 'auto', marginRight: 'auto' }}  
            > 
                <Toolbar style={{ justifyContent: 'center' }}> {/* Center the content in the Toolbar */} 
                    <Typography variant="h4" align="center"> {/* Center the text within Typography */}   
                        Weather Forecast 
                    </Typography>  
                </Toolbar>  
            </AppBar> 
      {/* Search Bar */}
      <form onSubmit={handleSearch}>
        <TextField
          type="date"
          label="Search by Date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 1, mb: 6 }}>
        Search by Date
        </Button>
      </form>

      {message && <Typography color="error" align="center" gutterBottom>{message}</Typography>}

      {filteredWeatherNotes.length > 0 && (
        <Typography variant="h5" align="center" gutterBottom sx={{  mb: 3 }}>
          Weather  For One Week
        </Typography>
      )}

      {/* Display Weather Data */}
      <Grid container spacing={3}>
        {filteredWeatherNotes.map((note, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card onClick={() => handleCardClick(note)} style={{ cursor: 'pointer', backdropFilter: 'blur(5px)' }}>
              <CardContent>
                <Typography variant="h6">
                  Date: {new Date(note.fetchedAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Time: {new Date(note.fetchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
                <Typography><strong>Temperature:</strong> {note.temperature} °C</Typography>
                <Typography><strong>Precipitation:</strong> {note.precipitation} mm</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Expanded Card */}
      <Dialog open={Boolean(selectedNote)} onClose={handleClose} BackdropComponent={Backdrop} BackdropProps={{ style: { backdropFilter: 'blur(8px)' } }}>
        <CardContent>
          {selectedNote && (
            <>
              <Typography variant="h5">Detailed Weather Information</Typography>
              <Typography variant="h6">Date: {new Date(selectedNote.fetchedAt).toLocaleDateString()}</Typography>
              <Typography variant="body1">
                Time: {new Date(selectedNote.fetchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
              <Typography><strong>Temperature:</strong> {selectedNote.temperature} °C</Typography>
              <Typography><strong>Precipitation:</strong> {selectedNote.precipitation} mm</Typography>
              <Typography><strong>Soil Moisture (0-1cm):</strong> {selectedNote.soilMoisture0To1cm}</Typography>
              <Typography><strong>Wind Speed:</strong> {selectedNote.windSpeed} km/h</Typography>
              <Typography><strong>Surface Pressure:</strong> {selectedNote.surfacePressure} hPa</Typography>
              <Button onClick={handleClose} variant="contained" color="secondary" fullWidth>
                Close
              </Button>
            </>
          )}
        </CardContent>
      </Dialog>
    </Container>
  );
}

export default WeatherHistory;
