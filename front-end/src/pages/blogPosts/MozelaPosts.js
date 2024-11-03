import axios from 'axios';  
import React, { useEffect, useState } from 'react';  
import {  
    Container,  
    Typography,  
    Grid,  
    Card,  
    CardContent,  
    CardActions,  
    Button,  
    Dialog,  
    DialogTitle,  
    DialogContent,  
    DialogActions,  
    Backdrop,
} from "@mui/material";  

function MozelaPosts() {  
    const [mozelaPosts, setMozelaPosts] = useState([]);  
    const [selectedPost, setSelectedPost] = useState(null);  
    const [open, setOpen] = useState(false);  

    useEffect(() => {  
        const getMozelaPosts = async () => {  
            try {  
                const response = await axios.get('http://localhost:4000/mozela/bulk');  
                console.log("response from Mozela posts", response);  
                if (response.data) {  
                    setMozelaPosts(response.data);  
                }  
            } catch (error) {  
                console.error("Error fetching Mozela posts:", error);  
            }  
        };  
        getMozelaPosts();  
    }, []);  

    const handleCardClick = (post) => {  
        setSelectedPost(post);  
        setOpen(true);  
    };  

    const handleClose = () => {  
        setOpen(false);  
        setSelectedPost(null);  
    };  

    return (  
        <Container maxWidth="lg" sx={{ padding: 4 }}>  
            <Typography variant="h4" component="h1" align="center" gutterBottom>  
                All Warnings from Moezala.gov  
            </Typography>  
            {mozelaPosts && mozelaPosts.length > 0 ? (  
                <Grid container spacing={4}>  
                    {mozelaPosts.map((post, index) => (  
                        <Grid item xs={12} sm={6} md={4} key={index}>  
                            <Card  
                                sx={{  
                                    height: "100%",  
                                    display: "flex",  
                                    flexDirection: "column",  
                                    cursor: "pointer", // Show pointer cursor on hover  
                                }}  
                                onClick={() => handleCardClick(post)} // Click handler  
                            >  
                                <CardContent>  
                                    <Typography variant="h6" component="h2" gutterBottom>  
                                        {post.title}  
                                    </Typography>  
                                    <Typography color="textSecondary" gutterBottom>  
                                        <strong>Warning Date:</strong> {post.date}  
                                    </Typography>  
                                    <Typography color="textSecondary" gutterBottom>  
                                        <strong>Hydrograph:</strong> {post.hydrograph}  
                                    </Typography>  
                                    {post.imageUrl ? (  
                                        <img src={post.imageUrl} alt="Flood Warning" className="w-full h-auto rounded-md mb-4" />  
                                    ) : (  
                                        <Typography color="error" gutterBottom>No image available</Typography>  
                                    )}  
                                    {post.paragraph ? (  
                                        <Typography variant="body2">{post.paragraph}</Typography>  
                                    ) : (  
                                        <Typography variant="body2" color="textSecondary">No additional information available</Typography>  
                                    )}  
                                </CardContent>  
                                <CardActions>  
                                    <Button  
                                        size="small"  
                                        color="primary"  
                                        variant="contained"  
                                        href={post.readMoreLink}  
                                        target="_blank"  
                                        rel="noopener noreferrer"  
                                    >  
                                        Read more  
                                    </Button>  
                                </CardActions>  
                            </Card>  
                        </Grid>  
                    ))}  
                </Grid>  
            ) : (  
                <Typography variant="body1" align="center" color="textSecondary">  
                    No Mozela posts found.  
                </Typography>  
            )}  

            {/* Dialog for displaying selected post details */}  
            <Dialog  
                open={open}  
                onClose={handleClose}  
                maxWidth="md" // Size of the dialog  
                fullWidth  
                BackdropComponent={Backdrop} BackdropProps={{ style: { backdropFilter: 'blur(8px)' } }}
            >  
                <DialogTitle>{selectedPost?.title}</DialogTitle>  
                <DialogContent>  
                    {selectedPost && (  
                        <>  
                            <Typography variant="body2" gutterBottom>  
                                <strong>Warning Date:</strong> {selectedPost.date}  
                            </Typography>  
                            <Typography variant="body2" gutterBottom>  
                                <strong>Hydrograph:</strong> {selectedPost.hydrograph}  
                            </Typography>  
                            {selectedPost.imageUrl && (  
                                <img src={selectedPost.imageUrl} alt="Flood Warning" className="w-full h-auto rounded-md mb-4" />  
                            )}  
                            <Typography variant="body1" paragraph>  
                                {selectedPost.paragraph || "No additional information available."}  
                            </Typography>  
                            <Typography variant="body2" color="textSecondary">  
                                <a href={selectedPost.readMoreLink} target="_blank" rel="noopener noreferrer">  
                                    Read more  
                                </a>  
                            </Typography>  
                        </>  
                    )}  
                </DialogContent>  
                <DialogActions>  
                    <Button onClick={handleClose} color="primary">  
                        Close  
                    </Button>  
                </DialogActions>  
            </Dialog>  
        </Container>  
    );  
}  

export default MozelaPosts;