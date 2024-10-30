import React, { useState } from "react";
import axios from "axios";

// All-in-One component to test the form and upload functionality

function OrganizationPosts({orgId}) {
  // State for post content
  const [postContent, setPostContent] = useState("");
  // State for file and file preview
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  // State for upload status
  const [uploading, setUploading] = useState(false);

  // Handle file input change and generate a preview
  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const acceptedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (selectedFile && acceptedImageTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      alert("Please upload a valid image file.");
      setFile(null);
      setPreview("");
    }
  };

  // Handle form submission and file upload
  const onUpload = async () => {
    console.log("Starting upload...");
    if (!postContent) {
      alert("Please add  a post.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file); // append file
    formData.append("content", postContent); // append post content
    formData.append("organizationId", orgId);


    console.log("sent data", formData);
    console.log("sent file", file);
    console.log("sent postContent", postContent);

    setUploading(true);
    try {
      // Sending data to the backend
      const response = await axios.post("http://localhost:4000/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload successful", response.data);
      alert("Post uploaded successfully!");

      // Clear form after successful upload
      setFile(null);
      setPreview("");
      setPostContent("");
    } catch (error) {
      console.error("Error uploading post:", error);
      alert("Error uploading post.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h1>Org Post Upload</h1>

      {/* Input for post content */}
      <input
        type="text"
        placeholder="What updates do you want to share?"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        required
        style={{ marginBottom: "20px", width: "100%", padding: "10px" }}
      />

      {/* File upload and preview */}
      <div className="mb-4">
        <label
          htmlFor="file-upload"
          className="cursor-pointer inline-block p-3 text-white bg-blue-500 rounded-xl font-semibold hover:bg-blue-600"
        >
          {preview ? "Change Photo" : "Add Photo"}
        </label>
        <input id="file-upload" type="file" className="hidden" onChange={onFileChange} />
      </div>

      {/* Image preview */}
      {preview && <img src={preview} alt="Preview" style={{ width: "300px", marginBottom: "20px" }} />}

      {/* Upload button */}
      <button
        onClick={onUpload}
        disabled={uploading || !postContent || !file}
        className="border font-semibold hover:border-blue-400 p-3 rounded-xl mb-4"
      >
        {uploading ? "Uploading..." : "Upload Post"}
      </button>
    </div>
  );
}

export default OrganizationPosts;
