import { NextRequest, NextResponse } from 'next/server';
import authService from '@/lib/salla/services/auth.service';
import { formatErrorResponse } from '@/lib/salla/utils/errors';

// POST /api/v1/auth/logout
export async function POST(_req: NextRequest) {
  try {
    await authService.logout();
    return NextResponse.json({ success: true, message: 'Logged out successfully' });
  } catch (error: any) {
    const err = formatErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
