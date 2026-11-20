import { getMeetingById } from "@/lib/meetings-db";
import type { ApiError } from "@/lib/types";

// GET /api/meetings/[id]
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id } = await context.params;

  if (!/^\d+$/.test(id)) {
    const body: ApiError = { error: "id must be a valid number" };
    return Response.json(body, { status: 400 });
  }

  const meeting = getMeetingById(Number(id));
  if (!meeting) {
    const body: ApiError = { error: `No meeting found with id ${id}` };
    return Response.json(body, { status: 404 });
  }

  return Response.json(meeting);
}
