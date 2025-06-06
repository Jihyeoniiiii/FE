import { fetchInventoryByCategory } from "@/lib/api/inventory";
import { useQuery } from "@tanstack/react-query";

export const useInteractionSearch = () => {
  return useQuery({
    queryKey: ["decoration"],
    queryFn: () => fetchInventoryByCategory("INTERACTION"),
  });
};