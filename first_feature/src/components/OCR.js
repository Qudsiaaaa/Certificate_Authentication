import React, { useEffect } from 'react';
import Tesseract from 'tesseract.js';

function OCR({ image, onTextExtracted }) {
  useEffect(() => {
    if (image) {
      Tesseract.recognize(image)
        .then((result) => {
          const extractedText = result.data.text.trim();
          onTextExtracted(extractedText);
        })
        .catch((error) => {
          console.error('OCR Error:', error);
          onTextExtracted('');
        });
    }
  }, [image, onTextExtracted]);

  return <></>;
}

export default OCR;
