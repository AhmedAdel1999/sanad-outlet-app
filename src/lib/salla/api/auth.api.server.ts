/**
 * Server-side Salla auth API client.
 * Calls Salla store REST API directly - does NOT use @salla.sa/twilight (browser-only).
 */

import EnvironmentConfig from "../config/environment";
import logger from "../utils/logger";
import { SallaSDKError, getErrorMessage } from "../utils/errors";

export type LoginType = "email" | "mobile";

export interface LoginPayload {
  type: LoginType;
  phone?: string;
  country_code?: string;
  email?: string;
}

export interface VerifyPayload {
  type: LoginType;
  code: string;
  phone?: string;
  country_code?: string;
  email?: string;
}

function getBaseUrl(): string {
  const env = EnvironmentConfig.get();
  const storeUrl = env.SALLA_STORE_URL.replace(/\/$/, "");
  return `${storeUrl}/api/v2`;
}

async function sallaFetch<T>(
  path: string,
  options: RequestInit & { body?: object } = {},
): Promise<T> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${path}`;
  const { body, ...rest } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options.headers as Record<string, string>),
  };

  try {
    const res = await fetch(url, {
      ...rest,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const dataObj = data as Record<string, unknown>;
      const message =
        (typeof dataObj?.message === "string" ? dataObj.message : undefined) ??
        (dataObj?.errors && typeof dataObj.errors === "object"
          ? JSON.stringify(dataObj.errors)
          : undefined) ??
        res.statusText;
      throw new Error(message);
    }

    return data as T;
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
}

/** Request OTP (login step 1) */
export async function login(
  payload: LoginPayload,
): Promise<{ success: boolean; message?: string }> {
  const start = Date.now();
  try {
    logger.debug({ type: payload.type }, "[auth.api] login");
    const body: any =
      payload.type === "mobile"
        ? {
            type: "mobile",
            phone: payload.phone,
            country_code: payload.country_code ?? "SA",
          }
        : {
            type: "email",
            email: payload.email,
          };

    const res = await sallaFetch<{ success: boolean; data?: unknown }>(
      "/auth/login",
      { method: "POST", body },
    );

    logger.info(
      { ms: Date.now() - start, type: payload.type },
      "[auth.api] login ok",
    );
    return { success: res?.success ?? true, message: "Code sent" };
  } catch (err) {
    logger.error(
      { error: getErrorMessage(err), ms: Date.now() - start },
      "[auth.api] login failed",
    );
    throw new SallaSDKError(`Login failed: ${getErrorMessage(err)}`, err);
  }
}

/** Verify OTP and get token */
export async function verify(payload: VerifyPayload): Promise<{
  token: string;
  token_type: string;
  expires_in: number;
  customer?: unknown;
}> {
  const start = Date.now();
  try {
    logger.debug({ type: payload.type }, "[auth.api] verify");
    const body: any =
      payload.type === "mobile"
        ? {
            type: "mobile",
            code: payload.code,
            phone: payload.phone,
            country_code: payload.country_code ?? "SA",
          }
        : {
            type: "email",
            code: payload.code,
            email: payload.email,
          };

    const res = await sallaFetch<{
      success: boolean;
      data?: {
        token?: string;
        token_type?: string;
        expires_in?: number;
        customer?: unknown;
      };
    }>("/auth/verify", { method: "POST", body });

    const data = res?.data;
    if (!data?.token) {
      throw new Error("No token in verify response");
    }

    logger.info(
      { ms: Date.now() - start, type: payload.type },
      "[auth.api] verify ok",
    );
    return {
      token: data.token,
      token_type: data.token_type ?? "Bearer",
      expires_in: data.expires_in ?? 0,
      customer: data.customer,
    };
  } catch (err) {
    logger.error(
      { error: getErrorMessage(err), ms: Date.now() - start },
      "[auth.api] verify failed",
    );
    throw new SallaSDKError(`Verify failed: ${getErrorMessage(err)}`, err);
  }
}

/** Resend OTP */
export async function resend(payload: {
  type: LoginType;
  phone?: string;
  country_code?: string;
  email?: string;
}): Promise<{ success: boolean }> {
  const start = Date.now();
  try {
    logger.debug({ type: payload.type }, "[auth.api] resend");
    const body: any =
      payload.type === "mobile"
        ? {
            type: "mobile",
            phone: payload.phone,
            country_code: payload.country_code ?? "SA",
          }
        : {
            type: "email",
            email: payload.email,
          };

    await sallaFetch("/auth/resend", { method: "POST", body });
    logger.info(
      { ms: Date.now() - start, type: payload.type },
      "[auth.api] resend ok",
    );
    return { success: true };
  } catch (err) {
    logger.error(
      { error: getErrorMessage(err), ms: Date.now() - start },
      "[auth.api] resend failed",
    );
    throw new SallaSDKError(`Resend failed: ${getErrorMessage(err)}`, err);
  }
}
