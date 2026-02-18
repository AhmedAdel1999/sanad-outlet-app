import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as authApi from "@/lib/salla/api/auth.api.server";
import { formatErrorResponse, ValidationError } from "@/lib/salla/utils/errors";

const loginSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("mobile"),
    phone: z.string().min(1),
    country_code: z.string().default("SA"),
  }),
  z.object({
    type: z.literal("email"),
    email: z.string().email(),
  }),
]);

// POST /api/auth/login
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      const errors: Record<string, string[]> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path.join(".") || "root";
        errors[key] = [...(errors[key] ?? []), issue.message];
      });
      throw new ValidationError("Validation failed", errors);
    }

    const payload: authApi.LoginPayload =
      parsed.data.type === "mobile"
        ? {
            type: "mobile",
            phone: parsed.data.phone,
            country_code: parsed.data.country_code,
          }
        : { type: "email", email: parsed.data.email };

    const result = await authApi.login(payload);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    const err = formatErrorResponse(error as Error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
