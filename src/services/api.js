import axios from "axios";

const api = axios.create({
  baseURL: "https://startupforge-server-5pdk.vercel.app",
  withCredentials: true,
});

export default api;