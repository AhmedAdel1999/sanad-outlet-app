import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as authApi from "@/lib/salla/api/auth.api.server";
import { formatErrorResponse, ValidationError } from "@/lib/salla/utils/errors";

const verifySchema = z
  .object({
    type: z.enum(["email", "mobile"]),
    value: z.string().min(1).optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    country_code: z.string().optional(),
    code: z.string().min(4).max(8),
  })
  .refine(
    (d) =>
      d.type === "mobile"
        ? (d.phone ?? d.value) != null
        : (d.email ?? d.value) != null,
    { message: "phone or value required for mobile; email or value for email" }
  );

// POST /api/auth/verify
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = verifySchema.safeParse(body);
    if (!parsed.success) {
      const errors: Record<string, string[]> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path.join(".") || "root";
        errors[key] = [...(errors[key] ?? []), issue.message];
      });
      throw new ValidationError("Validation failed", errors);
    }

    const payload: authApi.VerifyPayload =
      parsed.data.type === "mobile"
        ? {
            type: "mobile",
            code: parsed.data.code,
            phone: parsed.data.phone ?? parsed.data.value ?? "",
            country_code: parsed.data.country_code ?? "SA",
          }
        : {
            type: "email",
            code: parsed.data.code,
            email: parsed.data.email ?? parsed.data.value ?? "",
          };

    const result = await authApi.verify(payload);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    const err = formatErrorResponse(error as Error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
