import { NextResponse } from "next/server";
import { hostFamilies } from "@/lib/mock/families";

export function GET() {
  return NextResponse.json({ hostFamilies });
}
