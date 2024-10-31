import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, Card, CardContent, CardMedia, Button  } from "@mui/material";
import PostComment from "../comments/PostComment";

function OrgSide({orgId}) {
  const [orgPosts, setOrgPosts] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors
  const [showComments, setShowComments] = useState({}); // To handle visibility of comments
 

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/posts/grouped`);
        console.log("all posts grouped:", response.data.organizationPosts);
        if (response.data.organizationPosts) {
          setOrgPosts(response.data.organizationPosts);
        }
      } catch (error) {
        console.error("Error fetching the posts:", error);
        setError("Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, []);

  const toggleComments = (postId) => {
    setShowComments((prevShowComments) => ({
      ...prevShowComments,
      [postId]: !prevShowComments[postId],
    }));
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
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Organization Posts
      </Typography>
      {orgPosts.map((post) => (
        <Card key={post.id} sx={{ mb: 2, p: 2 }}>
          <CardContent>
            <Typography variant="h6">{post.content}</Typography>
            <Typography color="textSecondary">
              Created At: {new Date(post.createdAt).toLocaleDateString()}
            </Typography>
          </CardContent>
          {post.imageUrl && (
            <CardMedia
              component="img"
              height="200"
              image={`http://localhost:4000${post.imageUrl}`}
              alt="Post image"
            />
          )}
          <CardContent>
            <Button onClick={() => toggleComments(post.id)}>
              {showComments[post.id] ? "Hide Comments" : "Show Comments"} ({post.comments.length})
            </Button>
            <Typography>Likes: {post.likes.length}</Typography>
          </CardContent>
          {showComments[post.id] && (
            <CardContent>
              {post.comments.map((comment) => (
                <Box key={comment.id} sx={{ mb: 1, pl: 2, borderLeft: "2px solid gray" }}>
                  <Typography variant="body2" color="textSecondary">
                    {comment.content}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    - {new Date(comment.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          )}
          <PostComment  PostId={post.id} orgId={orgId}/>
        </Card>
      ))}
    </div>
  );
}

export default OrgSide;
