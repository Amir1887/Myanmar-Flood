import axios from "axios";
import React, { useEffect, useState } from "react";
import usePosts from "../CustomHooks/usePosts";
import { Box, CircularProgress, Typography, Card, CardContent, CardMedia, Button  } from "@mui/material";
import CommentUserPost from "../comments/CommentUserPost";

function UserSide({userId}) {
    const { posts, loading, error } = usePosts();
    const [showComments, setShowComments] = useState({}); // To handle visibility of comments
  
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
          User Posts
        </Typography>
        {posts.userPosts.map((post) => (
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
                  <Typography variant="caption" color="textSecondary">
                    - {comment.user ? comment.user.name : comment.organization?.name || "Unknown"}
                    , {new Date(comment.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          )}


            <CommentUserPost userId={userId} postId={post.id}/>
          </Card>
        ))}
      </div>
    );
}

export default UserSide
