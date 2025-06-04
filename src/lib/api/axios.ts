import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.chaeum.site",
  withCredentials: true, // <- HttpOnly 쿠키 전송
  headers: {
    Authorization:
      "BearereyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoiZG9mbDg1NDlAbmF2ZXIuY29tIiwibWVtYmVySWQiOjYsInJvbGUiOiJET05PUiIsImlhdCI6MTc0OTAyNzE1NiwiZXhwIjoxNzQ5MDMwNzU2fQ.xaoXVTDwSUcOp8MD88f8G5jX-qL_YNmjDk_imXtPViJOAQmz96QxvPinlgSVKdixhE5bNIh_lC5eSUF0EB8Dlw",
  },
});

export default axiosInstance;
