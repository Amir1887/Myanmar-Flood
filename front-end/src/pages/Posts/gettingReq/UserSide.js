import axios from "axios";
import React, { useEffect, useState } from "react";
import usePosts from "../CustomHooks/usePosts";
import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  Avatar,
  Stack,
} from "@mui/material";
import CommentUserPost from "../comments/CommentUserPost";
import LikeButton from "../likes/PostsLikes";

function UserSide({ userId, orgId, currentSection, contextUserType }) {
  const { posts, loading, error } = usePosts();
  const [showComments, setShowComments] = useState({});

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
    <Box p={2}>
       <Divider sx={{ my: 3 }} />
      <Typography variant="h4" gutterBottom>
        Commuinity Updates
      </Typography>

      {posts.userPosts.length === 0 ? 
      ( // Check if there are no posts  
        <Typography variant="body1" color="textSecondary" align="center">  
          No Updates from Commuinity yet.  
        </Typography>  
      ) : 
    (posts.userPosts.map((post) => (
        <Card key={post.id} sx={{ mb: 4, p: 2 }}>
          <CardContent>
            {/* Author Info */}
            <Stack direction="row" spacing={2} alignItems="center" mb={1}>
              {post.user?.imageUrl && (
                <Avatar
                  src={post.user.imageUrl}
                  alt={post.user.name}
                  sx={{ width: 48, height: 48 }}
                />
              )}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" align="left">
                  {post.user ? post.user.name : "Unknown"}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="left">
                  {post.user?.email || ""}
                </Typography>
              </Box>
            </Stack>
            
            {/* Post Content */}
            <Box mt={2}>
              <Typography variant="h6" align="left" gutterBottom>
                {post.content}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mt: 1 }}
                align="left"
              >
                Created on: {new Date(post.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </CardContent>

          {/* Post Image */}
          {post.imageUrl && (
            <CardMedia
              component="img"
              height="300"
              image={`http://localhost:4000${post.imageUrl}`}
              alt="Post image"
              sx={{ borderRadius: 2, mt: 2 }}
            />
          )}

          {/* Like and Comment Actions */}
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LikeButton
                userId={userId}
                orgId={orgId}
                postId={post.id}
                contextUserType={contextUserType}
                initialUserLikes={post.likes}
                currentSectionUser={currentSection}
              />
              <Button onClick={() => toggleComments(post.id)}>
                {showComments[post.id] ? "Hide Comments" : "Show Comments"} (
                {post.comments.length})
              </Button>
            </Stack>
          </CardContent>

          {/* Comments Section */}
          {showComments[post.id] && (
            <CardContent>
              <Divider sx={{ mb: 2 }} />
              {post.comments.map((comment) => (
                <Box key={comment.id} sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    {comment.content}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    -{" "}
                    {comment.user
                      ? comment.user.name
                      : comment.organization?.name || "Unknown"}
                    , {new Date(comment.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
              <CommentUserPost userId={userId} postId={post.id} />
            </CardContent>
          )}
        </Card>
      )))}
    </Box>
  );
}

export default UserSide;
