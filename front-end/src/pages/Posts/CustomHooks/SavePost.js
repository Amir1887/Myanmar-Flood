import React, { useState } from "react";
import axios from "axios";
import useFileUpload from './useFileUpload';

async function useSavePost({ postContent, file, onSuccess }) {
    const [uploading, setUploading] = useState(false);
    const onUpload = async () => {
        console.log("Starting upload...");  
        const formData = new FormData();
        formData.append("photo", file);
        formData.append("content", postContent);// Add the post content to the form data

        console.log("uploaded form data", formData);
      
        setUploading(true);
        try {
            const response = await axios.post("http://localhost:4000/posts", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Upload successful", response);
            await onSuccess();
            alert("Post uploaded successfully!");
        } catch (error) {
            console.error("Error uploading post:", error);
            alert("Error uploading post.");
        } finally {
            setUploading(false);
        };
      };
    
      return { onUpload, uploading};
}

export default useSavePost
