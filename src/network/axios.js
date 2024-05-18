import axios from "axios";

export const instance = axios.create({
  baseURL: "https://travel-api-5lpf.onrender.com",
});
