import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import wishlistService from '@/lib/salla/services/wishlist.service';
import { formatErrorResponse, ValidationError } from '@/lib/salla/utils/errors';

const toggleSchema = z.object({ product_id: z.number().positive() });

// POST /api/v1/wishlist/toggle
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = toggleSchema.safeParse(body);
    if (!parsed.success) throw new ValidationError('product_id is required');

    const result = await wishlistService.toggleItem(parsed.data.product_id);
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    const err = formatErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
