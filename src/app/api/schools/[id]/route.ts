import { NextResponse } from "next/server";
import { schools } from "@/lib/mock/schools";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const school = schools.find((s) => s.id === id);
  if (!school) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ school });
}
