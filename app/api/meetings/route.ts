import { getMeetings } from "@/lib/meetings-db";
import { isIsoDate } from "@/lib/dates";
import type { ApiError, SacramentMeeting } from "@/lib/types";

// GET /api/meetings
// GET /api/meetings?date=2026-05-03
export async function GET(
  request: Request,
): Promise<Response> {
  const url = new URL(request.url);
  const date = url.searchParams.get("date");
  const query = url.searchParams.get("query");

  if (date !== null && !isIsoDate(date)) {
    const body: ApiError = { error: "date must be in YYYY-MM-DD format" };
    return Response.json(body, { status: 400 });
  }

  const meetings: SacramentMeeting[] = await getMeetings(date ?? undefined, query ?? undefined);
  return Response.json(meetings);
}
