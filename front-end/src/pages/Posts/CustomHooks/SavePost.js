import React, { useState } from "react";
import axios from "axios";
import useFileUpload from './useFileUpload';

function SavePost() {
    const [photoUrl, setPhotoUrl] = useState("");
    const [postContnet, setpostContnet] = useState("");
    const [uploading, setUploading] = useState(false);
    const { file } = useFileUpload();
    const onUpload = async () => {
        const formData = new FormData();
        formData.append("photo", file);
    
        setUploading(true);
        try {
          const response = await axios.post(`http://localhost:4000/posts`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          console.log("here is the res after uploading",response);
    

    
          alert("File uploaded successfully!");
        } catch (error) {
          console.error("Error uploading file:", error);
          alert("Error uploading file.");
        }
        setUploading(false);
    
      };
    
      return {onUpload, photoUrl, uploading, setpostContnet, postContnet};
  return (
    <div>
      
    </div>
  )
}

export default SavePost
