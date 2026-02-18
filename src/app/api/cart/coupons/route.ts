import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import cartService from '@/lib/salla/services/cart.service';
import { formatErrorResponse, ValidationError } from '@/lib/salla/utils/errors';

const couponSchema = z.object({ code: z.string().min(1) });

// POST /api/v1/cart/coupons
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = couponSchema.safeParse(body);
    if (!parsed.success) throw new ValidationError('Coupon code is required');

    const cart = await cartService.applyCoupon(parsed.data.code);
    return NextResponse.json({ success: true, data: cart });
  } catch (error: any) {
    const err = formatErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
