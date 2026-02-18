import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import cartService from "@/lib/salla/services/cart.service";
import { formatErrorResponse, ValidationError } from "@/lib/salla/utils/errors";

const updateSchema = z.object({
  quantity: z.number().int().min(1),
  notes: z.string().max(500).optional(),
});

// PUT /api/v1/cart/items/:itemId
export async function PUT(
  req: NextRequest,
  { params }: { params: { itemId: string } },
) {
  try {
    const body = await req.json();
    const parsed: any = updateSchema.safeParse(body);

    if (!parsed.success) {
      const errors: Record<string, string[]> = {};
      parsed.error.errors.forEach((e: any) => {
        const key = e.path.join(".") || "root";
        errors[key] = [...(errors[key] ?? []), e.message];
      });
      throw new ValidationError("Validation failed", errors);
    }

    const cart = await cartService.updateItem(params.itemId, parsed.data);
    return NextResponse.json({ success: true, data: cart });
  } catch (error: any) {
    const err = formatErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}

// DELETE /api/v1/cart/items/:itemId
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { itemId: string } },
) {
  try {
    const cart = await cartService.deleteItem(params.itemId);
    return NextResponse.json({ success: true, data: cart });
  } catch (error: any) {
    const err = formatErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
