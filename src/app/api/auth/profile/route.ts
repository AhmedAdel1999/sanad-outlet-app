import { NextRequest, NextResponse } from 'next/server';
import authService from '@/lib/salla/services/auth.service';
import { formatErrorResponse } from '@/lib/salla/utils/errors';

// GET /api/v1/auth/profile
export async function GET(_req: NextRequest) {
  try {
    const profile = await authService.getProfile();
    return NextResponse.json({ success: true, data: profile });
  } catch (error: any) {
    const err = formatErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
