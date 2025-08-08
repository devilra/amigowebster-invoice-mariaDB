import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  //baseURL: "http://localhost:4000",
  withCredentials: true,
});

export default API;
