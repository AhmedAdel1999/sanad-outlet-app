import { z } from "zod";

const envSchema = z.object({
  // Salla Configuration
  SALLA_STORE_URL: z.string().url(),
  SALLA_MERCHANT_ID: z.string().optional(),
  SALLA_APP_ID: z.string().optional(),
  SALLA_APP_SECRET: z.string().optional(),

  // Authentication
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default("7d"),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_REFRESH_EXPIRES_IN: z.string().default("30d"),
  SESSION_SECRET: z.string().min(32),

  // Redis Configuration
  REDIS_URL: z.string().url().optional(),
  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.string().default("6379"),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_DB: z.string().default("0"),

  // Cache Configuration
  CACHE_TTL_PRODUCTS: z.string().default("300"),
  CACHE_TTL_CATEGORIES: z.string().default("900"),
  CACHE_TTL_CART: z.string().default("60"),
  CACHE_TTL_CUSTOMER: z.string().default("300"),

  // Logging
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),

  // CORS
  ALLOWED_ORIGINS: z.string().default("http://localhost:3000"),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.string().default("60000"),
  RATE_LIMIT_MAX_REQUESTS: z.string().default("100"),

  // Node Environment
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

export type Environment = z.infer<typeof envSchema>;

class EnvironmentConfig {
  private static instance: Environment;

  static get(): Environment {
    if (!this.instance) {
      try {
        this.instance = envSchema.parse(process.env);
      } catch (error: any) {
        if (error) {
          console.error("❌ Environment validation failed:");
          error.errors.forEach((err: any) => {
            console.error(`  - ${err.path.join(".")}: ${err.message}`);
          });
          throw new Error("Invalid environment configuration");
        }
        throw error;
      }
    }
    return this.instance;
  }

  static getNumber(key: keyof Environment): number {
    const value = this.get()[key];
    return parseInt(value as string, 10);
  }

  static getBoolean(key: keyof Environment): boolean {
    const value = this.get()[key];
    return value === "true" || value === "1";
  }

  static isProduction(): boolean {
    return this.get().NODE_ENV === "production";
  }

  static isDevelopment(): boolean {
    return this.get().NODE_ENV === "development";
  }

  static isTest(): boolean {
    return this.get().NODE_ENV === "test";
  }
}

export default EnvironmentConfig;
