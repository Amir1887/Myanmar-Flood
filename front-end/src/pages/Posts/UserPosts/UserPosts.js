import React, { useState, useEffect } from "react";
import axios from "axios";
import useFileUpload from "../CustomHooks/useFileUpload";


function UserPosts() {
  const { file, uploading, preview, onFileChange, setUploading } = useFileUpload();
    const [photoUrl, setPhotoUrl] = useState("");

  //upload photo
  const onUpload = async () => {
    const formData = new FormData();
    formData.append("photo", file);

    setUploading(true);
    try {
      const response = await axios.post(`http://localhost:4000/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("here is the res after uploading",response);

      // Accessing the correct path for the uploaded image
      //  const imageUrl = response.data.updatedCourse.image;

      // Prepend the server URL to the photo URL if needed
      //  setPhotoUrl(`http://localhost:4000${imageUrl}`);
      // console.log("here is the photo url after uploading",`http://localhost:4000${imageUrl}`);

      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
    setUploading(false);

  };

  // if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Discussions(posts)</h1>
      <input type="text" placeholder="what updates you want to share?" required/>
      <div className="mb-4">
        <label
          htmlFor="file-upload"
          className="cursor-pointer inline-block p-3 text-white bg-blue-500 rounded-xl font-semibold hover:bg-blue-600"
        >
          {preview ? "Change Photo" : "Choose Photo"}
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden" // Hide the default file input
          onChange={onFileChange}
        />
      </div>

    {preview && (
            <div>
            <div className="mb-4 ml-5">
              <h3>Image Preview:</h3>
              <img src={preview} alt="Preview" style={{ width: "300px" }} />
            </div>
    
            <button
              className=" border font-semibold hover:border-blue-400 p-3 rounded-xl mb-4 max-w-xs"
              onClick={onUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Photo"}
            </button>
          </div>
    )}
    </div>
  );
}

export default UserPosts;
