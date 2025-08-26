import axios from "axios";

const baseURL= import.meta.env.VITE_BACKEND_URL

const API = axios.create({
  baseURL:baseURL,
  //baseURL: "http://localhost:4000",
  withCredentials: true,
});

export default API;
