import { usingInteractiveItem } from "@/lib/api/interactiveItem";
import { fetchInventoryByCategory } from "@/lib/api/inventory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useInteractionSearchQuery = () => {
  return useQuery({
    queryKey: ["interaction"],
    queryFn: () => fetchInventoryByCategory("INTERACTION"),
  });
};

export const useInteractiveMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => usingInteractiveItem(id),
    onSuccess: () => {
      console.log("InteractiveMutation onSuccess: Invalidate cat query!");
      queryClient.invalidateQueries({ queryKey: ["interaction"] });
      queryClient.invalidateQueries({ queryKey: ["cat"] });
    },
    onError: () => {
      alert("오류 발생");
    },
  });
};
