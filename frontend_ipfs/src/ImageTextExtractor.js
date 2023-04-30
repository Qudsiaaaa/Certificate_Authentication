import React, { useState } from "react";
import Tesseract from "tesseract.js";

function ImageTextExtractor() {
  const [image, setImage] = useState(null);
  const [ocrResult, setOcrResult] = useState("");

  const handleImageUpload = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleExtractText = async () => {
    setOcrResult("Extracting text, please wait...");
    try {
      const result = await Tesseract.recognize(image, "eng", {
        logger: (m) => console.log(m),
      });
      setOcrResult(result.data.text);
    } catch (error) {
      setOcrResult("Error extracting text. Please try another image.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Image Text Extractor</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <div>
          <img src={image} alt="selected" style={{ maxWidth: "300px" }} />
          <button onClick={handleExtractText}>Extract Text</button>
        </div>
      )}
      {ocrResult && (
        <div>
          <h2>Extracted Text:</h2>
          <p>{ocrResult}</p>
        </div>
      )}
    </div>
  );
}

export default ImageTextExtractor;
