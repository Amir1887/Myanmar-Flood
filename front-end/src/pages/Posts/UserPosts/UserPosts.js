import React, { useState, useEffect } from "react";
import useFileUpload from "../CustomHooks/useFileUpload";
import SavePost from "../CustomHooks/SavePost";

function UserPosts() {
  const {  file, preview, onFileChange } = useFileUpload();
  const {onUpload, photoUrl, uploading, setpostContnet, postContnet } = SavePost();

  // if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Discussions(posts)</h1>
      <div>
        <label>Adding new update</label>
        <input
          type="text"
          placeholder="what updates you want to share?"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="file-upload"
          className="cursor-pointer inline-block p-3 text-white bg-blue-500 rounded-xl font-semibold hover:bg-blue-600"
        >
          {preview ? "Change Photo" : "Add Photo"}
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
        </div>
      )}
      <button
        className=" border font-semibold hover:border-blue-400 p-3 rounded-xl mb-4 max-w-xs"
        onClick={onUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Post"}
      </button>
    </div>
  );
}

export default UserPosts;
