import axiosInstance from "./axios";

interface InventoryResponse {
  id: number;
  itemId: number;
  isWearing: boolean;
  quantity: number;
  createdAt: string;
}

export const fetchInventoryByCategory = async (
  category: string,
  cursor = null,
  limit = 3
): Promise<InventoryResponse[]> => {
  try {
    const response = await axiosInstance.get("/api/v1/inventory/category", {
      params: {
        category,
        cursor,
        limit,
      },
    });

    const searchCategoryData = response?.data?.data; // 응답 데이터에서 values 속성 추출
    console.log("/api/v1/inventory/${id}/toggle에 대한 결과: ", searchCategoryData.values);

    if ("values" in searchCategoryData) {
      // values가 배열이고 비어있지 않은 경우
      return searchCategoryData.values;
    } else {
      // values가 배열이 아니거나 비어있는 경우
      console.warn("유효하지 않은 응답 데이터:", response.data);
      return [];
    }
  } catch (error) {
    console.error("인벤토리 카테고리 조회 실패:", error);
    return [];
  }
};

export const toggleInventory = async (id: number) => {
  try {
    const response = await axiosInstance.post(`/api/v1/inventory/${id}/toggle`);
    console.log("/api/v1/inventory/${id}/toggle에 대한 결과과", response.data);

    return response.data;
  } catch (error) {
    console.error("인벤토리 아이템 토글 실패:", error);
    return null;
  }
};

export const wearingInventory = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/inventory/wearing");
    console.log(
      "/api/v1/inventory/wearing 조회에 대한 결과: ",
      response.data.data
    );
    return response.data.data;
  } catch (error) {
    console.error("인벤토리 착용 아이템 조회 실패:", error);
    return null;
  }
};
