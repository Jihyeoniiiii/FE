import axiosInstance from "./axios";

export const fetchMemberInfo = async () => {
  const response = await axiosInstance.get("/api/v1/member");
  return response.data.data;
};
