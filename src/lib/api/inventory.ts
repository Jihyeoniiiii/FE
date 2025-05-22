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

    const values = response?.data?.values; // 응답 데이터에서 values 속성 추출

    if (Array.isArray(values) && values.length > 0) { // values가 배열이고 비어있지 않은 경우
      return values;
    } else { // values가 배열이 아니거나 비어있는 경우
      console.warn("유효하지 않은 응답 데이터:", response.data);
      return [];
    }
  } catch (error) {
    console.error("인벤토리 카테고리 조회 실패:", error);
    return [];
  }
};
