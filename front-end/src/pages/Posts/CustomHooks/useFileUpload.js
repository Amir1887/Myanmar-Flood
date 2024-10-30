// useFileUpload.js
import { useState } from "react";

function useFileUpload() {
  const [file, setFile] = useState(null);
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

  return { file, preview, onFileChange, setPreview, setFile };
}

export default useFileUpload;
