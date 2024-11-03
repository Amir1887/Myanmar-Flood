import React, { useState, useEffect } from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { Box, Typography } from "@mui/material";
import axios from "axios";

function LikeButton({ orgId, postId, userId, contextUserType }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const checkLikesAndCount = async () => {
      try {
        const likeCountResponse = await axios.get(
          "http://localhost:4000/likes/count",
          { params: { postId } }
        );
        setLikeCount(likeCountResponse.data.count);

        if (contextUserType === "user" && userId) {
          const userLike = await axios.get(
            "http://localhost:4000/likes/check-user",
            { params: { postId, userId } }
          );
          if (userLike.data) {
            setIsLiked(true);
          }
        } else if (contextUserType === "organization" && orgId) {
          const orgLike = await axios.get(
            "http://localhost:4000/likes/check-org",
            { params: { postId, organizationId: orgId } }
          );
          if (orgLike.data) {
            setIsLiked(true);
          }
        }
      } catch (error) {
        console.error("Error checking like status or fetching count:", error);
      }
    };

    checkLikesAndCount();
  }, [postId, userId, orgId, contextUserType]);

  const handleLikeToggle = async () => {
    try {
      if (!isLiked) {
        await axios.post(
          contextUserType === "user"
            ? "http://localhost:4000/make-likes-user"
            : "http://localhost:4000/make-likes-org",
          {
            postId,
            ...(contextUserType === "user"
              ? { userId }
              : { organizationId: orgId }),
          }
        );
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      } else {
        await axios.delete(
          contextUserType === "user"
            ? "http://localhost:4000/delete-user-likes"
            : "http://localhost:4000/delete-org-likes",
          {
            params: {
              postId,
              ...(contextUserType === "user"
                ? { userId }
                : { organizationId: orgId }),
            },
          }
        );
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  return (
    <Box display="flex" alignItems="center" sx={{ gap: 1 }}>
      <IconButton onClick={handleLikeToggle} color="primary">
        {isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
      </IconButton>
      <Typography variant="body1" fontWeight="bold" color={isLiked ? "error" : "text.primary"}>
        {likeCount}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Votes
      </Typography>
    </Box>
  );
}

export default LikeButton;
