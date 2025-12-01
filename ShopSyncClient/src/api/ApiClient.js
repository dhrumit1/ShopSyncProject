import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // .NET API base URL
});

export default api;