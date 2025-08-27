import axios from "axios";

const basedURL= import.meta.env.VITE_BACKEND_URL

//console.log(basedURL)

const API = axios.create({
  baseURL:basedURL,
  //baseURL: "http://localhost:4000",

  withCredentials: true,
});

export default API;
