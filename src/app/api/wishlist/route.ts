import { NextRequest, NextResponse } from 'next/server';
import wishlistService from '@/lib/salla/services/wishlist.service';
import { formatErrorResponse } from '@/lib/salla/utils/errors';

// GET /api/v1/wishlist
export async function GET(_req: NextRequest) {
  try {
    const wishlist = await wishlistService.getWishlist();
    return NextResponse.json({ success: true, data: wishlist });
  } catch (error: any) {
    const err = formatErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}

// DELETE /api/v1/wishlist  – clear all
export async function DELETE(_req: NextRequest) {
  try {
    await wishlistService.clearWishlist();
    return NextResponse.json({ success: true, message: 'Wishlist cleared' });
  } catch (error: any) {
    const err = formatErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
