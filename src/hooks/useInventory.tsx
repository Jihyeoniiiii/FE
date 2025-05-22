import { fetchInventoryByCategory } from "@/lib/api/inventory";
import { useQuery } from "@tanstack/react-query";

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
}
