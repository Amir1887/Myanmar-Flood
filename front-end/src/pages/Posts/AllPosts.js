import React, { useState } from "react";  
import OrgPosts from './OrganizationPosts/OrgPosts';
import UserPosts from './UserPosts/UserPosts';

function AllPosts() {
  // State to track the active section
  const [activeSection, setActiveSection] = useState(null);

  // Define the useFileUpload hook
  function useFileUpload() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState("");
    
    const acceptedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    
    const onFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile && acceptedImageTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        alert("Please upload a valid image file.");
        setFile(null);
        setPreview("");
      }
    };

    return { file, uploading, preview, onFileChange, setUploading };
  }

  // Call useFileUpload to get the file upload state and functions
  const { file, uploading, preview, onFileChange, setUploading } = useFileUpload();

  // Function to display Organization Posts with props
  function DisplayOrg() {
    setActiveSection(
      <OrgPosts 
        file={file} 
        uploading={uploading} 
        preview={preview} 
        onFileChange={onFileChange} 
        setUploading={setUploading} 
      />
    );
  }

  // Function to display User Posts with props
  function DisplayUser() {
    setActiveSection(
      <UserPosts 
        file={file} 
        uploading={uploading} 
        preview={preview} 
        onFileChange={onFileChange} 
        setUploading={setUploading} 
      />
    );
  }

  return (
    <div>
      <h1>All Posts</h1>
      <button onClick={DisplayOrg}>Organizations Updates</button>
      <button onClick={DisplayUser}>User Discussion</button>

      {/* Render the active section */}
      <div>
        {activeSection}
      </div>
    </div>
  );
}

export default AllPosts;
