import React, { useState, useEffect } from "react";
import useFileUpload from "../CustomHooks/useFileUpload";
import SavePost from "../CustomHooks/SavePost";
import PostForm from "../PostForm";

function UserPosts() {
  const {  file, preview, onFileChange, setPreview, setFile } = useFileUpload();
  const [postContent, setPostContent] = useState("");

    // Reset state after successful upload
    const handleUploadSuccess = () => {
      setFile(null);  // Clear file
      setPreview(""); // Clear preview
      setPostContent(""); // Clear content
    };
  

  const { onUpload, uploading } = SavePost({ postContent, file,  onSuccess: handleUploadSuccess });

  // if (loading) return <div>Loading...</div>;

  return (
    <PostForm
      title="User Discussions"
      postContent={postContent}
      onContentChange={(e) => setPostContent(e.target.value)}
      onUpload={onUpload}
      preview={preview}
      onFileChange={onFileChange}
      uploading={uploading}
      file={file}
    />
  );
}

export default UserPosts;
