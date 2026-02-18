import apiClient from "./client";
import type {
  LoginPayload,
  VerifyPayload,
  RegisterPayload,
  AuthResult,
  AuthCustomer,
} from "@/lib/salla/services/auth.service";

export type {
  LoginPayload,
  VerifyPayload,
  RegisterPayload,
  AuthResult,
  AuthCustomer,
};

const BASE = "/api/auth";

export const authApi = {
  /** POST /api/v1/auth/login – request OTP */
  login: (
    payload: LoginPayload,
  ): Promise<{ success: boolean; message: string }> =>
    apiClient
      .post<{
        success: boolean;
        data: { success: boolean; message: string };
      }>(`${BASE}/login`, payload)
      .then((r) => r.data),

  /** POST /api/v1/auth/verify – verify OTP → returns token */
  verify: (payload: VerifyPayload): Promise<AuthResult> =>
    apiClient
      .post<{ success: boolean; data: AuthResult }>(`${BASE}/verify`, payload)
      .then((r) => r.data),

  /** POST /api/v1/auth/resend – resend OTP */
  resend: (
    payload: Pick<VerifyPayload, "type" | "value">,
  ): Promise<{ success: boolean }> =>
    apiClient
      .post<{
        success: boolean;
        data: { success: boolean };
      }>(`${BASE}/resend`, payload)
      .then((r) => r.data),

  /** POST /api/v1/auth/register */
  register: (payload: RegisterPayload): Promise<AuthResult> =>
    apiClient
      .post<{ success: boolean; data: AuthResult }>(`${BASE}/register`, payload)
      .then((r) => r.data),

  /** GET /api/v1/auth/profile */
  getProfile: (): Promise<AuthCustomer> =>
    apiClient
      .get<{ success: boolean; data: AuthCustomer }>(`${BASE}/profile`)
      .then((r) => r.data),

  /** POST /api/v1/auth/logout */
  logout: (): Promise<void> =>
    apiClient.post(`${BASE}/logout`).then(() => undefined),
};

export default authApi;
