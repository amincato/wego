import { NextResponse } from "next/server";
import { schools } from "@/lib/mock/schools";

export function GET() {
  return NextResponse.json({ schools });
}
