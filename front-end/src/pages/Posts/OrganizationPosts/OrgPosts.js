import React, { useState, useEffect } from "react";
import useFileUpload from '../CustomHooks/useFileUpload';
import PostForm from '../PostForm';
import useSavePost from "../CustomHooks/SavePost";

function OrgPosts() {
  const [postContent, setPostContent] = useState("");
  const { file, preview, onFileChange, setPreview, setFile} = useFileUpload();


  // Reset state after successful upload
 const handleUploadSuccess = () => {
    setFile(null);  // Clear file
    setPreview(""); // Clear preview
    setPostContent(""); // Clear content
  };


  const {  onUpload, uploading } = useSavePost({ postContent, file, onSuccess: handleUploadSuccess });


  return (
    <PostForm
      title="Organization Posts"
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

export default OrgPosts
