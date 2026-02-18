import SallaSDKConfig from '../config/sdk';
import logger from '../utils/logger';
import { SallaSDKError, getErrorMessage } from '../utils/errors';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WishlistProduct {
  id: number;
  name: string;
  url: string;
  thumbnail: string;
  price: {
    amount: number;
    currency: string;
    formatted: string;
  };
  sale_price?: {
    amount: number;
    currency: string;
    formatted: string;
  };
  is_available: boolean;
  is_out_of_stock: boolean;
  rating?: number;
  reviews_count?: number;
}

export interface WishlistItem {
  id: string;
  product: WishlistProduct;
  added_at: string;
}

export interface Wishlist {
  items: WishlistItem[];
  total: number;
}

export interface ToggleWishlistResult {
  is_wishlisted: boolean;
  product_id: number;
}

// ─── Service ──────────────────────────────────────────────────────────────────

class WishlistService {
  private get sdk() {
    return SallaSDKConfig.getSDK();
  }

  private async exec<T>(
    fn: () => Promise<T>,
    name: string,
    ctx?: Record<string, any>
  ): Promise<T> {
    const start = Date.now();
    try {
      logger.debug({ ...ctx }, `[wishlist] ${name}`);
      const result = await fn();
      logger.info({ ms: Date.now() - start, ...ctx }, `[wishlist] ${name} ok`);
      return result;
    } catch (err) {
      logger.error(
        { error: getErrorMessage(err), ms: Date.now() - start, ...ctx },
        `[wishlist] ${name} failed`
      );
      throw new SallaSDKError(`${name} failed: ${getErrorMessage(err)}`, err);
    }
  }

  /** Get all wishlist items */
  async getWishlist(): Promise<Wishlist> {
    return this.exec(
      () => this.sdk.wishlist.get() as any,
      'getWishlist'
    );
  }

  /** Add product to wishlist */
  async addItem(productId: number): Promise<WishlistItem> {
    return this.exec(
      () => this.sdk.wishlist.add(productId) as any,
      'addItem',
      { productId }
    );
  }

  /** Remove product from wishlist */
  async removeItem(productId: number): Promise<void> {
    return this.exec(
      () => this.sdk.wishlist.remove(productId) as any,
      'removeItem',
      { productId }
    );
  }

  /** Toggle product in/out of wishlist */
  async toggleItem(productId: number): Promise<ToggleWishlistResult> {
    return this.exec(
      () => this.sdk.wishlist.toggle(productId) as any,
      'toggleItem',
      { productId }
    );
  }

  /** Check if a product is wishlisted */
  async isWishlisted(productId: number): Promise<boolean> {
    try {
      const wishlist = await this.getWishlist();
      return wishlist.items.some((item) => item.product.id === productId);
    } catch {
      return false;
    }
  }

  /** Clear all wishlist items */
  async clearWishlist(): Promise<void> {
    return this.exec(
      () => this.sdk.wishlist.clear() as any,
      'clearWishlist'
    );
  }
}

export default new WishlistService();
