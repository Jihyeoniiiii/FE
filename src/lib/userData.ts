import { useQuery } from "@tanstack/react-query";
import { fetchMemberInfo } from "./api/user";

export const useMemberData = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchMemberInfo,
  });
};
