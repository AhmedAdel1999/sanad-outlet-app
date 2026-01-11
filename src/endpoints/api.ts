import { BASE_URL } from "@/constants/baseUrl";
import { Endpoint } from "@/types/global";

export const PRODUCT_API_ENDPOINTS = {
  getProductAPIs: {
    url: BASE_URL + "/v1/apis/products",
    method: "GET",
  },
} satisfies { [key: string]: Endpoint };
