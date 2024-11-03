import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

function CommentUserPost({ userId, postId }) {
  const [commentInfo, setCommentInfo] = useState("");
  const [uploading, setUploading] = useState(false);

  const onUpload = async () => {
    if (!commentInfo) {
      alert("Please add a comment.");
      return;
    }

    setUploading(true);
    try {
      await axios.post("http://localhost:4000/comments-user", {
        commentInfo,
        userId,
        postId,
      });
      alert("Comment uploaded successfully!");
      setCommentInfo("");
    } catch (error) {
      console.error("Error uploading comment:", error);
      alert("Error uploading comment.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={2} mt={2}>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Write a comment..."
        value={commentInfo}
        onChange={(e) => setCommentInfo(e.target.value)}
      />
      <Button
        onClick={onUpload}
        disabled={uploading || !commentInfo}
        variant="contained"
        color="primary"
        sx={{
          minWidth: "100px",
          height: "40px",
          bgcolor: "blue.600",
          "&:hover": { bgcolor: "blue.700" },
        }}
      >
        {uploading ? "Uploading..." : "Comment"}
      </Button>
    </Box>
  );
}

export default CommentUserPost;
