import { NextRequest, NextResponse } from 'next/server';
import cartService from '@/lib/salla/services/cart.service';
import { formatErrorResponse } from '@/lib/salla/utils/errors';

// GET /api/v1/cart
export async function GET(_req: NextRequest) {
  try {
    const cart = await cartService.getCart();
    return NextResponse.json({ success: true, data: cart });
  } catch (error: any) {
    const err = formatErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
