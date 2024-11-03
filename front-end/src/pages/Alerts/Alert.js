import axios from 'axios';  
import React, { useEffect, useState } from 'react';  
import { Card, CardContent, Typography, Dialog, Backdrop, Button, Box, AppBar, Toolbar } from '@mui/material';  

function Alert() {  
    const [alerts, setAlerts] = useState([]); // Store alerts  
    const [openDialog, setOpenDialog] = useState(false);  
    const [selectedWeatherData, setSelectedWeatherData] = useState(null);  

    // Fetch alerts from the server  
    useEffect(() => {  
        const getAlerts = async () => {  
            try {  
                const response = await axios.get('http://localhost:4000/alerts');  
                console.log("response from alerts", response);  
                if (response.data) {  
                    setAlerts(response.data);  
                }  
            } catch (error) {  
                console.error("Error fetching alerts:", error);  
            }  
        };  
        getAlerts();  
    }, []);  

    // Handle alert click to show weather data in a dialog (modified to use both card click and button)  
    const handleAlertClick = (alert) => {  
        setSelectedWeatherData(alert.weatherData);  
        setOpenDialog(true);  
    };  

    // Close the dialog  
    const handleCloseDialog = () => {  
        setOpenDialog(false);  
        setSelectedWeatherData(null);  
    };  
 

    return (  
        
        <Box p={4} >
            <AppBar   
                position="static"   
                color="primary"   
                style={{ marginTop: '10px', marginBottom: '25px', width: '40%', marginLeft: 'auto', marginRight: 'auto' }}  
            > 
                <Toolbar style={{ justifyContent: 'center' }}> {/* Center the content in the Toolbar */}
                    <Typography variant="h4" align="center"> {/* Center the text within Typography */}    
                      Past  Alerts  Notifications
                    </Typography>  
                </Toolbar>  
            </AppBar>  
            {alerts.length > 0 ? (  
                alerts.map((alert) => (  
                    <Card  
                        key={alert.id}  
                        onClick={() => handleAlertClick(alert)} // Allows card click to open dialog  
                        style={{ cursor: 'pointer', marginBottom: '1rem' }}  
                    >  
                        <CardContent>  
                            <Typography variant="h6">{alert.message}</Typography>  
                            <Typography variant="body2"><strong>Latitude:</strong> {alert.latitude}</Typography>  
                            <Typography variant="body2"><strong>Longitude:</strong> {alert.longitude}</Typography>  
                            <Typography variant="body2"><strong>Status:</strong> {alert.status}</Typography>  
                            <Typography variant="body2"><strong>Created At:</strong> {new Date(alert.createdAt).toLocaleString()}</Typography>  
                            <Button  
                                onClick={() => {  
                                  
                                    handleAlertClick(alert); // Open dialog when button is clicked  
                                }}  
                                variant="contained"  
                                color="primary"  
                                style={{ marginTop: '1rem' }}  
                            >  
                                See Weather Details  
                            </Button>   
                        </CardContent>  
                    </Card>  
                ))  
            ) : (  
                <Typography>No alerts found.</Typography>  
            )}  

            <Dialog  
                open={openDialog}  
                onClose={handleCloseDialog}  
                BackdropComponent={Backdrop}  
                BackdropProps={{ style: { backdropFilter: 'blur(8px)' } }}  
            >  
                <div className="p-4" style={{ background: 'white' }}>  
                    <Typography variant="h5" className="text-lg font-bold mb-2">Weather Details:</Typography>  
                    {selectedWeatherData ? (  
                        <>  
                            <Typography><strong>Temperature:</strong> {selectedWeatherData.temperature} °C</Typography>  
                            <Typography><strong>Precipitation:</strong> {selectedWeatherData.precipitation} mm</Typography>  
                            <Typography><strong>Soil Moisture (0-1 cm):</strong> {selectedWeatherData.soilMoisture0To1cm}</Typography>  
                            <Typography><strong>Soil Moisture (1-3 cm):</strong> {selectedWeatherData.soilMoisture1To3cm}</Typography>  
                            <Typography><strong>Soil Moisture (3-9 cm):</strong> {selectedWeatherData.soilMoisture3To9cm}</Typography>  
                            <Typography><strong>Surface Pressure:</strong> {selectedWeatherData.surfacePressure} hPa</Typography>  
                            <Typography><strong>Wind Speed:</strong> {selectedWeatherData.windSpeed} km/h</Typography>  
                            <Typography><strong>Wind Gusts:</strong> {selectedWeatherData.windGusts} km/h</Typography>  
                            <Typography><strong>Visibility:</strong> {selectedWeatherData.visibility} meters</Typography>  
                            <Typography><strong>Cloud Cover:</strong> {selectedWeatherData.cloudCover}%</Typography>  
                        </>  
                    ) : (  
                        <Typography>No weather data available.</Typography>  
                    )}  
                    <Button onClick={handleCloseDialog} color="primary">Close</Button>  
                </div>  
            </Dialog>  
            </Box>
    );  
}  

export default Alert;