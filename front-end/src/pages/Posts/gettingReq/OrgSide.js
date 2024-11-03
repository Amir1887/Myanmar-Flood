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
import PostComment from "../comments/PostComment";
import LikeButton from "../likes/PostsLikes";

function OrgSide({ orgId, userId, currentSection, contextUserType }) {
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
        Organization Updates
      </Typography>
      {posts.organizationPosts.length === 0 ? 
      ( // Check if there are no posts  
        <Typography variant="body1" color="textSecondary" align="center">  
          No Updates from Organizations yet.  
        </Typography>  
      ) :
  (    posts.organizationPosts.map((post) => (
        <Card key={post.id} sx={{ mb: 4, p: 2 }}>
          <CardContent>
            {/* Author Info */}
            <Stack direction="row" spacing={2} alignItems="center" mb={1}>
              {post.organization?.imageUrl && (
                <Avatar
                  src={post.organization.imageUrl}
                  alt={post.organization.name}
                  sx={{ width: 48, height: 48 }}
                />
              )}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" align="left">
                  {post.organization ? post.organization.name : "Unknown"}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="left">
                  {post.organization?.email || ""}
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
              <Button onClick={() => toggleComments(post.id)}>
                {showComments[post.id] ? "Hide Comments" : "Show Comments"} (
                {post.comments.length})
              </Button>
              <LikeButton
                orgId={orgId}
                postId={post.id}
                userId={userId}
                contextUserType={contextUserType}
              />
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
              <PostComment PostId={post.id} userId={userId} orgId={orgId} />
            </CardContent>
          )}
        </Card>
      )))}
    </Box>
  );
}

export default OrgSide;
