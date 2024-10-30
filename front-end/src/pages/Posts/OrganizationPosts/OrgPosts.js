import React, { useState, useEffect } from "react";
import useFileUpload from '../CustomHooks/useFileUpload';
import SavePost from '../CustomHooks/SavePost';
import PostForm from '../PostForm';

function OrgPosts() {
  const [postContent, setPostContent] = useState("");
  const { file, preview, onFileChange, setPreview, setFile} = useFileUpload();


  // Reset state after successful upload
 const handleUploadSuccess = () => {
    setFile(null);  // Clear file
    setPreview(""); // Clear preview
    setPostContent(""); // Clear content
  };


  const {  onUpload, uploading } = SavePost({ postContent, file,  onSuccess: handleUploadSuccess });


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
