import { UseQueryOptions } from "@tanstack/react-query";

export type QueryOptions<TData, TError, TQueryData = TData> = Omit<
  UseQueryOptions<TData, TError, TQueryData>,
  "queryKey" | "queryFn"
>;
