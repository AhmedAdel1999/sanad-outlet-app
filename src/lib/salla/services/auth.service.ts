import SallaSDKConfig from "../config/sdk";
import logger from "../utils/logger";
import { SallaSDKError, getErrorMessage } from "../utils/errors";

// ─── Types ────────────────────────────────────────────────────────────────────

export type LoginType = "email" | "mobile";

export interface LoginPayload {
  type: LoginType;
  phone: string;
  country_code: string;
}

export interface VerifyPayload {
  type: LoginType;
  value: string;
  code: string;
}

export interface RegisterPayload {
  name: string;
  mobile: string;
  email?: string;
  gender?: "male" | "female";
  birthday?: string;
}

export interface AuthCustomer {
  id: number;
  name: string;
  email: string;
  mobile: string;
  mobile_code: string;
  avatar: string;
  gender?: string;
  birthday?: string;
  currency: string;
  loyalty?: {
    total_points: number;
    expiry_points: number;
    expiry_date: string;
  };
}

export interface AuthResult {
  token: string;
  token_type: string;
  expires_in: number;
  customer?: AuthCustomer;
}

// ─── Service ──────────────────────────────────────────────────────────────────

class AuthService {
  private get sdk() {
    return SallaSDKConfig.getSDK();
  }

  private async exec<T>(
    fn: () => Promise<T>,
    name: string,
    ctx?: Record<string, any>,
  ): Promise<T> {
    const start = Date.now();
    try {
      logger.debug(`[auth] ${name}`, ctx as any);
      const result = await fn();
      logger.info({ ms: Date.now() - start, ...ctx }, `[auth] ${name} ok`);
      return result;
    } catch (err) {
      logger.error(
        { error: getErrorMessage(err), ms: Date.now() - start, ...ctx },
        `[auth] ${name} failed`,
      );
      throw new SallaSDKError(`${name} failed: ${getErrorMessage(err)}`, err);
    }
  }

  /** Step 1 – request OTP */
  async login(
    payload: LoginPayload,
  ): Promise<{ success: boolean; message: string }> {
    return this.exec(() => this.sdk.auth.login(payload) as any, "login", {
      type: payload.type,
    });
  }

  /** Step 2 – verify OTP and receive token */
  async verify(payload: VerifyPayload): Promise<AuthResult> {
    return this.exec(() => this.sdk.auth.verify(payload) as any, "verify", {
      type: payload.type,
    });
  }

  /** Resend OTP code */
  async resendCode(
    payload: Pick<VerifyPayload, "type" | "value">,
  ): Promise<{ success: boolean }> {
    return this.exec(() => this.sdk.auth.login(payload) as any, "resendCode", {
      type: payload.type,
    });
  }

  /** Register new customer */
  async register(payload: RegisterPayload): Promise<AuthResult> {
    return this.exec(() => this.sdk.auth.register(payload) as any, "register");
  }

  /** Get current logged-in customer profile */
  async getProfile(): Promise<AuthCustomer> {
    return this.exec(
      () => this.sdk.auth.getCustomerInfo() as any,
      "getProfile",
    );
  }

  /** Log out current customer */
  async logout(): Promise<void> {
    return this.exec(() => this.sdk.auth.logout() as any, "logout");
  }

  /** Check if customer is authenticated */
  isAuthenticated(): boolean {
    try {
      return this.sdk.auth.isLoggedIn();
    } catch {
      return false;
    }
  }
}

export default new AuthService();
