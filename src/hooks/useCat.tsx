import { fetchCatInfo } from "@/lib/api/cat";
import { useQuery } from "@tanstack/react-query";

export const useCat = () => {
  return useQuery({
    queryKey: ["cat"],
    queryFn: async () => {
      console.log("fetchCatInfo 호출됨");
      const data = await fetchCatInfo();
      console.log("fetchCatInfo 응답:", data);
      return data;
    },
  });
};
