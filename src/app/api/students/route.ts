import { NextResponse } from "next/server";
import { students } from "@/lib/mock/students";

export function GET() {
  return NextResponse.json({ students });
}
