import apiClient from './client';
import type { Cart, AddToCartPayload, UpdateCartItemPayload } from '@/lib/salla/services/cart.service';

export type { Cart, CartItem, CartCoupon, CartPrice } from '@/lib/salla/services/cart.service';

// Re-export payload types
export type { AddToCartPayload, UpdateCartItemPayload };

const BASE = '/cart';

export const cartApi = {
  /** GET /api/v1/cart */
  getCart: (): Promise<Cart> =>
    apiClient.get<{ success: boolean; data: Cart }>(BASE).then((r) => r.data),

  /** POST /api/v1/cart/items */
  addItem: (payload: AddToCartPayload): Promise<Cart> =>
    apiClient
      .post<{ success: boolean; data: Cart }>(`${BASE}/items`, payload)
      .then((r) => r.data),

  /** PUT /api/v1/cart/items/:itemId */
  updateItem: (itemId: string, payload: UpdateCartItemPayload): Promise<Cart> =>
    apiClient
      .put<{ success: boolean; data: Cart }>(`${BASE}/items/${itemId}`, payload)
      .then((r) => r.data),

  /** DELETE /api/v1/cart/items/:itemId */
  deleteItem: (itemId: string): Promise<Cart> =>
    apiClient
      .delete<{ success: boolean; data: Cart }>(`${BASE}/items/${itemId}`)
      .then((r) => r.data),

  /** POST /api/v1/cart/coupons */
  applyCoupon: (code: string): Promise<Cart> =>
    apiClient
      .post<{ success: boolean; data: Cart }>(`${BASE}/coupons`, { code })
      .then((r) => r.data),

  /** DELETE /api/v1/cart/coupons/:code */
  removeCoupon: (code: string): Promise<Cart> =>
    apiClient
      .delete<{ success: boolean; data: Cart }>(`${BASE}/coupons/${code}`)
      .then((r) => r.data),
};

export default cartApi;
