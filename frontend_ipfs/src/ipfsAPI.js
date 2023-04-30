import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // Replace with your backend server URL
});

export async function storeIndividualData(individualData) {
  const response = await api.post("/api/ipfs/add", { individualData });
  return response.data;
}
