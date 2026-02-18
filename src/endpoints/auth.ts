import { BASE_URL } from "@/constants/baseUrl";
import { Endpoint } from "@/types/global";

export const AUTH_API_ENDPOINTS = {
  login: {
    url: "/api/auth/login",
    method: "POST",
  },
} satisfies { [key: string]: Endpoint };
