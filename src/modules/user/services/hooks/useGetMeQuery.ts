import { ApiErrorResponse } from "@/lib/api/types";
import { QueryOptions } from "@/lib/react-query/types";
import { userService } from "@/modules/user/services/userService";
import { UserResponse } from "@/modules/user/types";
import { useQuery } from "@tanstack/react-query";

export const GET_ME_KEY = "GET_ME_KEY";

type GetMeQueryOptions = QueryOptions<UserResponse, ApiErrorResponse>;

export function useGetMeQuery(options?: GetMeQueryOptions) {
  return useQuery({
    queryKey: [GET_ME_KEY],
    queryFn: () => userService.getMe(),
    retry: false,
    ...options,
  });
}
