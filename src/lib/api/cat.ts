import axiosInstance from "./axios";

 export const fetchCatInfo = async () => {
    const { data } = await axiosInstance.get("/api/v1/cat");
    return data.data;
  };