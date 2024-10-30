import React from 'react'

function PostForm({ title, onContentChange, onUpload, preview, onFileChange, uploading, file }) {
    return (
        <div>
          <h1>{title}</h1>
          <input
            type="text"
            placeholder="What updates do you want to share?"
            onChange={onContentChange}
            required
          />
          <div className="mb-4">
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-block p-3 text-white bg-blue-500 rounded-xl font-semibold hover:bg-blue-600"
            >
              {preview ? "Change Photo" : "Add Photo"}
            </label>
            <input id="file-upload" type="file" className="hidden" onChange={onFileChange} />
          </div>
          {preview && <img src={preview} alt="Preview" style={{ width: "300px" }} />}
          <button onClick={onUpload} disabled={uploading || !file}>
            {uploading ? "Uploading..." : "Upload Post"}
          </button>
        </div>
      );
}

export default PostForm
