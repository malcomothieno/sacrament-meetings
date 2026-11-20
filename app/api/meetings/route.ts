import { getMeetings } from "@/lib/meetings-db";
import { isIsoDate } from "@/lib/dates";
import type { ApiError, SacramentMeeting } from "@/lib/types";

// GET /api/meetings
// GET /api/meetings?date=2026-05-03
export async function GET(
  request: Request,
): Promise<Response> {
  const date = new URL(request.url).searchParams.get("date");

  if (date !== null && !isIsoDate(date)) {
    const body: ApiError = { error: "date must be in YYYY-MM-DD format" };
    return Response.json(body, { status: 400 });
  }

  const meetings: SacramentMeeting[] = getMeetings(date ?? undefined);
  return Response.json(meetings);
}
