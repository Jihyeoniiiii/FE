import {
  fetchInventoryByCategory,
  toggleInventory,
  wearingInventory,
} from "@/lib/api/inventory";
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

export const useToggleInventory = () => {
  return useMutation({
    mutationFn: (id: number) => toggleInventory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["decoration"] });
      queryClient.invalidateQueries({ queryKey: ["interior"] });
      queryClient.invalidateQueries({ queryKey: ["wearing"] });
    },
    onError: (error) => {
      alert("오류가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      console.error("인벤토리 아이템 토글 실패:", error);
    },
  });
};

export const useWearingInventory = () => {
  return useQuery({
    queryKey: ["wearing"],
    queryFn: () => wearingInventory(),
    staleTime: 1000 * 60, // 1분 동안 fresh 상태 유지
  });
};
