import { fetchCatInfo } from "@/lib/api/cat";
import { useQuery } from "@tanstack/react-query";

export const useCat = () => {
  return useQuery({
    queryKey: ["cat"],
    queryFn: fetchCatInfo,
  });
};
