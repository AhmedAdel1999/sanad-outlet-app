import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import authService from "@/lib/salla/services/auth.service";
import { formatErrorResponse, ValidationError } from "@/lib/salla/utils/errors";

const registerSchema = z.object({
  name: z.string().min(2),
  mobile: z.string().min(9),
  email: z.string().email().optional(),
  gender: z.enum(["male", "female"]).optional(),
  birthday: z.string().optional(),
});

// POST /api/v1/auth/register
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed: any = registerSchema.safeParse(body);
    if (!parsed.success) {
      const errors: Record<string, string[]> = {};
      parsed.error.errors.forEach((e: any) => {
        const key = e.path.join(".") || "root";
        errors[key] = [...(errors[key] ?? []), e.message];
      });
      throw new ValidationError("Validation failed", errors);
    }

    const result = await authService.register(parsed.data);
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error: any) {
    const err = formatErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
