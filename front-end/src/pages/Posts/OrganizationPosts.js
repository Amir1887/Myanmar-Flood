import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  Stack,
} from "@mui/material";
import axios from "axios";
import OrgSide from "./gettingReq/OrgSide";

function OrganizationPosts({ orgId, userId, currentSection, contextUserType }) {
  const [postContent, setPostContent] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const acceptedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (selectedFile && acceptedImageTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      alert("Please upload a valid image file.");
      setFile(null);
      setPreview("");
    }
  };

  const onUpload = async () => {
    if (!postContent) {
      alert("Please add a post.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("content", postContent);
    formData.append("organizationId", orgId);

    setUploading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/posts",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Post uploaded successfully!");
      setFile(null);
      setPreview("");
      setPostContent("");
    } catch (error) {
      alert("Error uploading post.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      sx={{ maxWidth: "600px", margin: "0 auto", textAlign: "center", p: 2 }}
    >
      {contextUserType === "organization" && (
        <>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Share With other Commuinity!
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="What updates do you want to share?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                component="span"
                color="primary"
                sx={{ textTransform: "none" }}
              >
                {preview ? "Change Photo" : "Add Photo"}
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              hidden
              onChange={onFileChange}
            />
            {preview && (
              <Avatar
                src={preview}
                alt="Preview"
                sx={{ width: 120, height: 120, borderRadius: 1, mt: 2 }}
              />
            )}
          </Box>
          <Button
            onClick={onUpload}
            disabled={uploading || !postContent || !file}
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ py: 1.2, fontWeight: "bold" }}
          >
            {uploading ? "Uploading..." : "Update"}
          </Button>
        </>
      )}
      <OrgSide
        orgId={orgId}
        userId={userId}
        contextUserType={contextUserType}
        currentSection={currentSection}
      />
    </Box>
  );
}

export default OrganizationPosts;
