import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

function PostComment({ PostId, orgId }) {
  const [commentInfo, setCommentInfo] = useState("");
  const [uploading, setUploading] = useState(false);

  const onUpload = async () => {
    if (!commentInfo) {
      alert("Please add a comment.");
      return;
    }

    setUploading(true);
    try {
      await axios.post("http://localhost:4000/comments-org", {
        commentInfo,
        PostId,
        orgId,
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
        placeholder="Comment now..."
        value={commentInfo}
        onChange={(e) => setCommentInfo(e.target.value)}
      />
      <Button
        onClick={onUpload}
        disabled={uploading || !commentInfo}
        variant="contained"
        color="primary"
      >
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </Box>
  );
}

export default PostComment;
