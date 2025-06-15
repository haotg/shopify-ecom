import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/services/products.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const first = Number(searchParams.get("first") || "12");
    const after = searchParams.get("after") || undefined;
    const query = searchParams.get("query") || undefined;
    const sortBy = searchParams.get("sortBy") || "PRICE_LOW_TO_HIGH";

    const reverse = sortBy === "PRICE_HIGH_TO_LOW";

    const result = await productService.search({
      first,
      after,
      query,
      sortKey: "PRICE",
      reverse,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
