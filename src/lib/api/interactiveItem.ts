import axiosInstance from "./axios";



export const usingInteractiveItem = async (
  id: number
)=> {
  try {
    const response = axiosInstance.post(`/api/v1/inventory/${id}/use`);

    console.log("인터렉티브 아이템 사용 결과:", response);
    return response;
  } catch (error) {
    console.log("interactive Item post 통신 요류", error);
  }
};
