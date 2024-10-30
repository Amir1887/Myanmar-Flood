import React from 'react'
import useFileUpload from '../CustomHooks/useFileUpload';
import SavePost from '../CustomHooks/SavePost';

function OrgPosts() {
  const { file, preview, onFileChange} = useFileUpload();
  const {  onUpload, photoUrl, uploading, setpostContnet, postContnet } = SavePost();

  function HandlePostContent(e){
    setpostContnet(e.target.value)
  }

    return (
      <div>
        <h1>Organization posts</h1>
        <div>
        <label>Adding new update</label>
        <input
          type="text"
          placeholder="what updates you want to share?"
          onChange={HandlePostContent}
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
            value={postContnet}
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

export default OrgPosts
