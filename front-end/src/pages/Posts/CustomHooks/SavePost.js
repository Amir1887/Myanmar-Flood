import React, { useState } from "react";
import axios from "axios";
import useFileUpload from './useFileUpload';

async function SavePost({ postContent, file,  onSuccess }) {
    const [uploading, setUploading] = useState(false);
    const onUpload = async () => {
        const formData = new FormData();
        formData.append("photo", file);
        formData.append("content", postContent);// Add the post content to the form data
      
        setUploading(true);
        try {
          await axios.post("http://localhost:4000/posts", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          alert("Post uploaded successfully!");

        // Call the onSuccess callback to reset states in parent
         await onSuccess();
        } catch (error) {
          console.error("Error uploading post:", error);
          alert("Error uploading post.");
        }
        setUploading(false);
      };
    
      return { onUpload, uploading};
  return (
    <div>
      
    </div>
  )
}

export default SavePost
