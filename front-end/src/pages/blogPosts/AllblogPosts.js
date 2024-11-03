import React, { useState } from 'react';  
import MozelaPosts from './MozelaPosts';  
import ReliefWebPosts from './ReliefWebPosts';  
import MimuPosts from './MimuPosts';  
import { Container, Typography, Button, AppBar, Toolbar } from '@mui/material';  

function AllBlogPosts() {  
    const [currentComponent, setCurrentComponent] = useState(null);  

    // Functions to load each component  
    function loadMozela() {  
        setCurrentComponent(<MozelaPosts />);  
    }  

    function loadReliefWeb() {  
        setCurrentComponent(<ReliefWebPosts />);  
    }  

    function loadMimu() {  
        setCurrentComponent(<MimuPosts />);  
    }  

    return (  
        <Container>  
            {/* Header with AppBar */}  
            <AppBar   
                position="static"   
                color="primary"   
                style={{ marginTop: '20px', width: '40%', marginLeft: 'auto', marginRight: 'auto' }}  
            > 
                <Toolbar style={{ justifyContent: 'center' }}> {/* Center the content in the Toolbar */} 
                    <Typography variant="h4" align="center"> {/* Center the text within Typography */}   
                        All Blog Posts  
                    </Typography>  
                </Toolbar>  
            </AppBar>  

            {/* Button Container */}  
            <div style={{ margin: '20px 0', textAlign: 'center' }}>  
                <Button   
                    variant="contained"   
                    color="secondary"   
                    onClick={loadMozela}   
                    style={{ margin: '0 10px' }}  
                >  
                    Daily Alerts  
                </Button>  
                <Button   
                    variant="contained"   
                    color="secondary"   
                    onClick={loadReliefWeb}  
                    style={{ margin: '0 10px' }}  
                >  
                    Situation Reports  
                </Button>  
                <Button   
                    variant="contained"   
                    color="secondary"   
                    onClick={loadMimu}  
                    style={{ margin: '0 10px' }}  
                >  
                    Detailed Updates  
                </Button>  
            </div>  

            {/* Render the current component */}  
            <div>  
                {currentComponent}  
            </div>  
        </Container>  
    );  
}  

export default AllBlogPosts;