import { Endpoint } from "@/types/global";
import { parseRequestURL, requester } from "@/lib/requester";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useStore } from "@/store";

export function useRequester<T>({
  endpoint,
  options,
  replace,
  params,
  cache = true,
}: {
  endpoint: Endpoint;
  options?: UseQueryOptions<T>;
  replace?: { [key: string]: string };
  params?: { [key: string]: string };
  cache?: boolean;
}) {
  const { parsedURL } = parseRequestURL({ endpoint, replace, params });
  const { user, token } = useStore();

  const { ...rest } = useQuery<T>({
    queryFn: () => {
      return requester<T>({
        endpoint,
        options: { params },
        token: token as any,
        replace,
      });
    },

    retry: 0,
    gcTime: cache ? 300000 : 0,
    enabled: user ? Boolean(token) : true,
    refetchOnWindowFocus: false,
    queryKey: options?.queryKey || [parsedURL],
    ...options,
  });

  return { ...rest };
}
