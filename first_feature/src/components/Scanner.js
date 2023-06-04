import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import OCR from './OCR';

function Scanner() {
  const [imgPreview, setImgPreview] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [verificationResult, setVerificationResult] = useState('');

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = function (event) {
        setImgPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextExtracted = (text) => {
    setExtractedText(text);
    verifyData(text);
  };

  const verifyData = (text) => {
    const database = ['Qudsia Rashid', 'Valid Text 1', 'Valid Text 3'];
    if (database.includes(text)) {
      setVerificationResult('Authentic');
    } else {
      setVerificationResult('Fake');
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const fileInputRef = React.createRef();

  return (
    <div style={{ marginBottom: '150px' }}>
      <div
        className="holder"
        style={{
          width: '250px',
          height: '200px',
          marginLeft: '100px',
          border: '2px solid purple',
          marginBottom: '30px',
        }}
      >
        <img
          id="imgPreview"
          src={imgPreview}
          alt="pic"
          style={{ width: '245px', height: '195px' }}
        />
      </div>
      <Button onClick={handleFileInputClick} style={{ marginLeft: '170px' }}>
        Select file
      </Button>
      <OCR image={imgPreview} onTextExtracted={handleTextExtracted} />
      {verificationResult && <p>Verification Result: {verificationResult}</p>}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handlePhotoChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default Scanner;
