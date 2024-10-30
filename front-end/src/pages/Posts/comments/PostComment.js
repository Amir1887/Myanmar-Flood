import React, { useState } from "react";
import axios from "axios";

//comment section for org posts 
function PostComment({PostId, orgId}) {
    const [commentInfo, setCommentInfo] = useState("");
    const [uploading, setUploading] = useState(false);

      const onUpload = async () => {
        console.log("Starting upload...");
        if (!commentInfo) {
          alert("Please add  a comment.");
          return;
        }
    
    
        setUploading(true);
        try {
          // Sending data to the backend
          const response = await axios.post("http://localhost:4000/comments-org", {commentInfo, PostId, orgId});
    
          console.log("Upload successful", response.data);
          alert("Comment uploaded successfully!");
    
          // Clear form after successful upload
          setCommentInfo("");
        } catch (error) {
          console.error("Error uploading comment:", error);
          alert("Error uploading comment.");
        } finally {
          setUploading(false);
        }
      };
  return (
    <div>
      
      {/* Input for post content */}
      <input
        type="text"
        placeholder="Comment Now"
        value={commentInfo}
        onChange={(e) => setCommentInfo(e.target.value)}
        required
        style={{ marginBottom: "20px", width: "100%", padding: "10px" }}
      />
    {/* Upload button */}
     <button
        onClick={onUpload}
        disabled={uploading || !commentInfo }
        className="border font-semibold hover:border-blue-400 p-3 rounded-xl mb-4"
      >
        {uploading ? "Uploading..." : "Upload Comment"}
      </button>
    </div>
  )
}

export default PostComment
