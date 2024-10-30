import React, { useState, useEffect } from "react";
import useFileUpload from '../CustomHooks/useFileUpload';
import SavePost from '../CustomHooks/SavePost';
import PostForm from '../PostForm';

function OrgPosts() {
  const [postContent, setPostContent] = useState("");
  const { file, preview, onFileChange, setPreview, setFile} = useFileUpload();
  const {  onUpload, uploading } = SavePost({ postContent, file, setPreview, setFile });


  return (
    <PostForm
      title="Organization Posts"
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
