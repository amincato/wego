import { NextResponse } from "next/server";
import { students } from "@/lib/mock/students";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const student = students.find((s) => s.id === id);
  if (!student) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ student });
}
