import Redis, { RedisOptions } from 'ioredis';
import EnvironmentConfig from './environment';

/**
 * Redis Connection Manager for Next.js
 * Uses singleton pattern to prevent multiple connections
 */
class RedisConfig {
  private static client: Redis | null = null;
  private static connecting = false;

  /**
   * Get Redis connection options
   */
  private static getOptions(): RedisOptions {
    const env = EnvironmentConfig.get();

    if (env.REDIS_URL) {
      return {
        lazyConnect: false,
        retryStrategy: (times: number) => {
          const delay = Math.min(times * 50, 2000);
          return delay;
        },
        maxRetriesPerRequest: 3,
        enableReadyCheck: true,
        enableOfflineQueue: true,
      };
    }

    return {
      host: env.REDIS_HOST,
      port: EnvironmentConfig.getNumber('REDIS_PORT'),
      password: env.REDIS_PASSWORD,
      db: EnvironmentConfig.getNumber('REDIS_DB'),
      lazyConnect: false,
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      enableOfflineQueue: true,
    };
  }

  /**
   * Get or create Redis client (Singleton)
   */
  static async getClient(): Promise<Redis | null> {
    // If already connected, return existing client
    if (this.client && this.client.status === 'ready') {
      return this.client;
    }

    // If currently connecting, wait
    if (this.connecting) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return this.getClient();
    }

    // Create new connection
    try {
      this.connecting = true;
      const env = EnvironmentConfig.get();
      const options = this.getOptions();

      this.client = env.REDIS_URL
        ? new Redis(env.REDIS_URL, options)
        : new Redis(options);

      // Setup event handlers
      this.client.on('connect', () => {
        console.log('✅ Redis connected');
      });

      this.client.on('ready', () => {
        console.log('✅ Redis ready');
      });

      this.client.on('error', (error) => {
        console.error('❌ Redis error:', error.message);
      });

      this.client.on('close', () => {
        console.log('⚠️ Redis connection closed');
      });

      // Wait for connection
      await this.client.connect();
      
      this.connecting = false;
      return this.client;
    } catch (error) {
      this.connecting = false;
      console.warn('⚠️ Redis connection failed, continuing without cache:', error);
      this.client = null;
      return null;
    }
  }

  /**
   * Check if Redis is available
   */
  static async isAvailable(): Promise<boolean> {
    try {
      const client = await this.getClient();
      if (!client) return false;
      
      await client.ping();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Close Redis connection
   */
  static async disconnect(): Promise<void> {
    try {
      if (this.client) {
        await this.client.quit();
        this.client = null;
        console.log('✅ Redis disconnected');
      }
    } catch (error) {
      console.error('❌ Error disconnecting from Redis:', error);
    }
  }
}

export default RedisConfig;
