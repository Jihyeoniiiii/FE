import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.chaeum.site",
  withCredentials: true, // <- HttpOnly 쿠키 전송
});

export default axiosInstance;
