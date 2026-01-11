import { useStore } from "@/store";
import { Endpoint } from "@/types/global";
import axios, { AxiosError } from "axios";
import { useLocale } from "next-intl";

export function requester<T>({
  endpoint,
  replace,
  options,
  token,
  responseType,
}: {
  endpoint: Endpoint;
  replace?: { [key: string]: string };
  options?: {
    params?: { [key: string]: string };
    data?: { [key: string]: any } | FormData;
  };
  token?: string;
  queryParams?: { [key: string]: string };
  responseType?: any;
}): Promise<T> {
  const { method } = endpoint;
  const { logout } = useStore();
  const locale = useLocale();

  const { parsedURL } = parseRequestURL({
    endpoint,
    replace,
    params: options?.params,
  });

  return axios({
    url: parsedURL,
    data: options?.data,
    headers: token
      ? {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          "ACCEPT-LANGUAGE": locale,
        }
      : {},
    method,
    ...(responseType && { responseType }),
  })
    .then((res: any) => res.data)
    .catch((e: AxiosError) => {
      //@ts-ignore
      if (token && e.response?.data.message == "Invalid Token") {
        logout();
      }
      throw new Error("error");
    });
}

export function parseRequestURL({
  endpoint,
  replace,
  params,
}: {
  endpoint: Endpoint;
  replace?: { [key: string]: string };
  params?: { [key: string]: string };
}) {
  let { url } = endpoint;

  if (replace) {
    Object.keys(replace).forEach((key) => {
      url = url.replace(`:${key}`, replace[key]);
    });
  }

  if (params) {
    url = url + "?" + new URLSearchParams(params).toString();
  }

  return { parsedURL: url };
}
