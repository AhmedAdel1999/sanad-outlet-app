import SallaSDKConfig from '../config/sdk';
import logger from '../utils/logger';
import { SallaSDKError, getErrorMessage } from '../utils/errors';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartPrice {
  amount: number;
  currency: string;
  formatted: string;
}

export interface CartItem {
  id: string;
  product_id: number;
  name: string;
  thumbnail?: string;
  quantity: number;
  price: CartPrice;
  total: CartPrice;
  options?: Array<{ name: string; value: string }>;
  notes?: string;
  is_available: boolean;
}

export interface CartCoupon {
  code: string;
  discount: CartPrice;
  type: 'percentage' | 'fixed';
}

export interface Cart {
  id: string;
  items: CartItem[];
  items_count: number;
  subtotal: CartPrice;
  discount: CartPrice;
  shipping: CartPrice;
  tax: CartPrice;
  total: CartPrice;
  coupons: CartCoupon[];
  is_empty: boolean;
  checkout_url?: string;
}

export interface AddToCartPayload {
  id: number;
  quantity: number;
  options?: Record<string, number | string>;
  notes?: string;
}

export interface UpdateCartItemPayload {
  quantity: number;
  notes?: string;
}

// ─── Service ──────────────────────────────────────────────────────────────────

class CartService {
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
      logger.debug({ ...ctx }, `[cart] ${name}`);
      const result = await fn();
      logger.info({ ms: Date.now() - start, ...ctx }, `[cart] ${name} ok`);
      return result;
    } catch (err) {
      logger.error(
        { error: getErrorMessage(err), ms: Date.now() - start, ...ctx },
        `[cart] ${name} failed`
      );
      throw new SallaSDKError(`${name} failed: ${getErrorMessage(err)}`, err);
    }
  }

  async getCart(): Promise<Cart> {
    return this.exec(() => this.sdk.cart.fetch() as any, 'getCart');
  }

  async getCartId(): Promise<string> {
    return this.exec(() => this.sdk.cart.getId() as any, 'getCartId');
  }

  async addItem(payload: AddToCartPayload): Promise<Cart> {
    if (!payload.id || payload.quantity < 1) throw new Error('Invalid product ID or quantity');
    return this.exec(
      () => this.sdk.cart.addItem(payload) as any,
      'addItem',
      { productId: payload.id, qty: payload.quantity }
    );
  }

  async quickAdd(productId: number): Promise<Cart> {
    return this.exec(
      () => this.sdk.cart.addItem({ id: productId, quantity: 1 }) as any,
      'quickAdd',
      { productId }
    );
  }

  async updateItem(itemId: string, payload: UpdateCartItemPayload): Promise<Cart> {
    return this.exec(
      () => this.sdk.cart.updateItem(itemId, payload) as any,
      'updateItem',
      { itemId, ...payload }
    );
  }

  async deleteItem(itemId: string): Promise<Cart> {
    return this.exec(
      () => this.sdk.cart.deleteItem(itemId) as any,
      'deleteItem',
      { itemId }
    );
  }

  async applyCoupon(code: string): Promise<Cart> {
    return this.exec(() => this.sdk.cart.addCoupon(code) as any, 'applyCoupon', { code });
  }

  async removeCoupon(code: string): Promise<Cart> {
    return this.exec(() => this.sdk.cart.deleteCoupon(code) as any, 'removeCoupon', { code });
  }
}

export default new CartService();
