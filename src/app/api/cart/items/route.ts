import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import cartService from "@/lib/salla/services/cart.service";
import { formatErrorResponse, ValidationError } from "@/lib/salla/utils/errors";

const addSchema = z.object({
  id: z.number().positive(),
  quantity: z.number().int().min(1),
  //options: z.record(z.union([z.number(), z.string()])).optional(),
  notes: z.string().max(500).optional(),
});

// POST /api/v1/cart/items
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed: any = addSchema.safeParse(body);

    if (!parsed.success) {
      const errors: Record<string, string[]> = {};
      parsed.error.errors.forEach((e: any) => {
        const key = e.path.join(".") || "root";
        errors[key] = [...(errors[key] ?? []), e.message];
      });
      throw new ValidationError("Validation failed", errors);
    }

    const cart = await cartService.addItem(parsed.data);
    return NextResponse.json({ success: true, data: cart }, { status: 201 });
  } catch (error: any) {
    const err = formatErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
