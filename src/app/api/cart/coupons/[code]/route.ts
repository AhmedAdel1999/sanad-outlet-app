import { NextRequest, NextResponse } from 'next/server';
import cartService from '@/lib/salla/services/cart.service';
import { formatErrorResponse } from '@/lib/salla/utils/errors';

// DELETE /api/v1/cart/coupons/:code
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const cart = await cartService.removeCoupon(params.code);
    return NextResponse.json({ success: true, data: cart });
  } catch (error: any) {
    const err = formatErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
