import { useQuery } from "@tanstack/react-query";
import { get } from "../authHooks";

export const useGetMyUsers = (promoter_id) => {
  return useQuery({
    queryKey: ["myUsers", promoter_id],
    queryFn: async () => {
      if (!promoter_id) return { users: [] };
      return await get(`/api/promoter/my-users/${promoter_id}`);
    },
    enabled: !!promoter_id,
  });
};
