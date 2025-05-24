import { fetchInventoryByCategory, toggleInventory } from "@/lib/api/inventory";
import { queryClient } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useDecorationSearch = () => {
  return useQuery({
    queryKey: ["decoration"],
    queryFn: () => fetchInventoryByCategory("DECORATION"),
  });
};

export const useInteriorSearch = () => {
  return useQuery({
    queryKey: ["interior"],
    queryFn: () => fetchInventoryByCategory("INTERIOR"),
  });
};

export const usetoggleInventory = () => {
  return useMutation({
    mutationFn: (id: number) => toggleInventory(id),
    onSuccess: (data) => {
      console.log("인벤토리 아이템 토글 성공:", data);
      queryClient.invalidateQueries({ queryKey: ["decoration"] });
      queryClient.invalidateQueries({ queryKey: ["interior"] });
    },
    onError: (error) => {
      <div> 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요</div>;
      console.error("인벤토리 아이템 토글 실패:", error);
    },
  });
};
