import Salla from '@salla.sa/twilight';
import EnvironmentConfig from './environment';

export interface SallaConfig {
  storeUrl: string;
  merchantId?: string;
  appId?: string;
  appSecret?: string;
}

/**
 * Salla SDK Configuration Manager for Next.js
 */
class SallaSDKConfig {
  private static instance: typeof Salla | null = null;
  private static config: SallaConfig;
  private static initialized = false;

  /**
   * Initialize Salla SDK with configuration
   */
  static initialize(): typeof Salla {
    if (this.initialized && this.instance) {
      return this.instance;
    }

    const env = EnvironmentConfig.get();

    this.config = {
      storeUrl: env.SALLA_STORE_URL,
      merchantId: env.SALLA_MERCHANT_ID,
      appId: env.SALLA_APP_ID,
      appSecret: env.SALLA_APP_SECRET,
    };

    try {
      // Initialize Salla SDK
      Salla.config.set({
        store: this.config.storeUrl,
        locale: 'ar', // Default locale
      });

      this.instance = Salla;
      this.initialized = true;

      console.log('✅ Salla SDK initialized:', this.config.storeUrl);

      return this.instance;
    } catch (error) {
      console.error('❌ Failed to initialize Salla SDK:', error);
      throw new Error('Salla SDK initialization failed');
    }
  }

  /**
   * Get configured SDK instance
   */
  static getSDK(): typeof Salla {
    if (!this.initialized || !this.instance) {
      return this.initialize();
    }
    return this.instance;
  }

  /**
   * Get current configuration
   */
  static getConfig(): SallaConfig {
    return this.config;
  }

  /**
   * Update SDK locale for specific request
   */
  static setLocale(locale: string): void {
    try {
      Salla.config.set({ locale });
    } catch (error) {
      console.warn('Failed to set locale:', locale);
    }
  }

  /**
   * Check if SDK is initialized
   */
  static isInitialized(): boolean {
    return this.initialized;
  }
}

export default SallaSDKConfig;
