import React, { useState } from "react";
import { storeIndividualData } from "./ipfsAPI";

function App() {
  const [individualData, setIndividualData] = useState({
    name: "",
    info: {
      dateOfBirth: "",
      certificateId: "",
      // ...other details
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setIndividualData({ ...individualData, [name]: value });
    } else {
      setIndividualData({
        ...individualData,
        info: { ...individualData.info, [name]: value },
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await storeIndividualData(individualData);
      console.log("IPFS Path:", response.ipfsPath);
    } catch (error) {
      console.error("Error storing individual data:", error.message);
    }
  };

  return (
    <div>
      <h1>Store Individual Data on IPFS</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={individualData.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={individualData.info.dateOfBirth}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Certificate ID:
          <input
            type="text"
            name="certificateId"
            value={individualData.info.certificateId}
            onChange={handleInputChange}
          />
        </label>
        <br />
        {/* Add more input fields for other details as needed */}
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default App;
