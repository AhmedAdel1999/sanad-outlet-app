import { NextRequest, NextResponse } from 'next/server';
import wishlistService from '@/lib/salla/services/wishlist.service';
import { formatErrorResponse } from '@/lib/salla/utils/errors';

// POST /api/v1/wishlist/:productId – add
export async function POST(
  _req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const id = parseInt(params.productId, 10);
    if (isNaN(id)) return NextResponse.json({ success: false, message: 'Invalid product ID' }, { status: 400 });

    const item = await wishlistService.addItem(id);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error: any) {
    const err = formatErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}

// DELETE /api/v1/wishlist/:productId – remove
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const id = parseInt(params.productId, 10);
    if (isNaN(id)) return NextResponse.json({ success: false, message: 'Invalid product ID' }, { status: 400 });

    await wishlistService.removeItem(id);
    return NextResponse.json({ success: true, message: 'Removed from wishlist' });
  } catch (error: any) {
    const err = formatErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
