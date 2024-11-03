import axios from "axios";  
import React, { useEffect, useState } from "react";  
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
  Backdrop
} from "@mui/material";  

function MimuPosts() {  
  const [mimuPosts, setMimuPosts] = useState([]);  
  const [selectedPost, setSelectedPost] = useState(null);  
  const [open, setOpen] = useState(false);  

  useEffect(() => {  
    const getMimuPosts = async () => {  
      try {  
        const response = await axios.get("http://localhost:4000/mimu/bulk");  
        console.log("response from mimu posts", response);  
        if (response.data) {  
          setMimuPosts(response.data);  
        }  
      } catch (error) {  
        console.error("Error fetching mimu posts:", error);  
      }  
    };  
    getMimuPosts();  
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
        All Updates from MIMU  
      </Typography>  
      <Typography variant="body1" align="center" color="textSecondary" gutterBottom sx={{mb: 3}}>  
        <a href={"https://themimu.info/"} target="_blank" rel="noopener noreferrer">  
          (Myanmar Information Management Unit)  
        </a>  
      </Typography>  
      {mimuPosts && mimuPosts.length > 0 ? (  
        <Grid container spacing={4}>  
          {mimuPosts.map((post, index) => (  
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
                <CardContent sx={{ flexGrow: 1 }}>  
                  <Typography variant="h6" component="h2" gutterBottom>  
                    {post.title}  
                  </Typography>  
                  <Typography color="textSecondary" gutterBottom>  
                    <strong>Published at:</strong> {post.uploadedDate}  
                  </Typography>  
                  <Typography color="textSecondary" gutterBottom>  
                    <strong>Retrieved at:</strong> {post.createdAt}  
                  </Typography>  
                  <Typography color="textSecondary" gutterBottom>  
                    <strong>Updated at:</strong> {post.updatedAt}  
                  </Typography>  
                  {post.summary ? (  
                    <Typography variant="body2" color="textPrimary">  
                      {post.summary}  
                    </Typography>  
                  ) : (  
                    <Typography variant="body2" color="textSecondary">  
                      No additional information available  
                    </Typography>  
                  )}  
                </CardContent>  
                <CardActions>  
                  <Button  
                    size="small"  
                    color="primary"  
                    variant="contained"  
                    href={post.pdfLink}  
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
          No Mimu posts found.  
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
                <strong>Published at:</strong> {selectedPost.uploadedDate}  
              </Typography>  
              <Typography variant="body2" gutterBottom>  
                <strong>Retrieved at:</strong> {selectedPost.createdAt}  
              </Typography>  
              <Typography variant="body2" gutterBottom>  
                <strong>Updated at:</strong> {selectedPost.updatedAt}  
              </Typography>  
              <Typography variant="body1" paragraph>  
                {selectedPost.summary || "No additional information available."}  
              </Typography>  
              <Typography variant="body2" color="textSecondary">  
                <a href={selectedPost.pdfLink} target="_blank" rel="noopener noreferrer">  
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

export default MimuPosts;