import apiClient from './client';
import type {
  Wishlist,
  WishlistItem,
  ToggleWishlistResult,
} from '@/lib/salla/services/wishlist.service';

export type { Wishlist, WishlistItem, WishlistProduct, ToggleWishlistResult } from '@/lib/salla/services/wishlist.service';

const BASE = '/wishlist';

export const wishlistApi = {
  /** GET /api/v1/wishlist */
  getWishlist: (): Promise<Wishlist> =>
    apiClient
      .get<{ success: boolean; data: Wishlist }>(BASE)
      .then((r) => r.data),

  /** POST /api/v1/wishlist/:productId */
  addItem: (productId: number): Promise<WishlistItem> =>
    apiClient
      .post<{ success: boolean; data: WishlistItem }>(`${BASE}/${productId}`)
      .then((r) => r.data),

  /** DELETE /api/v1/wishlist/:productId */
  removeItem: (productId: number): Promise<void> =>
    apiClient.delete(`${BASE}/${productId}`).then(() => undefined),

  /** POST /api/v1/wishlist/toggle */
  toggleItem: (productId: number): Promise<ToggleWishlistResult> =>
    apiClient
      .post<{ success: boolean; data: ToggleWishlistResult }>(`${BASE}/toggle`, { product_id: productId })
      .then((r) => r.data),

  /** DELETE /api/v1/wishlist */
  clearWishlist: (): Promise<void> =>
    apiClient.delete(BASE).then(() => undefined),
};

export default wishlistApi;
