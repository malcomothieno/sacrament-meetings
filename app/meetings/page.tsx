import type { Metadata } from "next";
import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import { getMeetings } from "@/lib/meetings-db";
import { getMostRecentSunday } from "@/lib/dates";

export const metadata: Metadata = { title: "All Meetings" };

const PAGE_SIZE = 5;

export default async function MeetingsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params.query || "";
  const pageStr = params.page || "1";
  const page = Math.max(1, parseInt(pageStr, 10) || 1);

  const allMeetings = await getMeetings(undefined, query || undefined);

  const totalMeetings = allMeetings.length;
  const totalPages = Math.ceil(totalMeetings / PAGE_SIZE) || 1;
  const startIndex = (page - 1) * PAGE_SIZE;
  const meetings = allMeetings.slice(startIndex, startIndex + PAGE_SIZE);
  const currentSunday = getMostRecentSunday();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">All Meetings</h1>

      <MeetingSearch />

      {meetings.length === 0 ? (
        <p className="text-muted">No meetings have been planned yet or match your search.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {meetings.map((meeting) => (
            <li key={meeting.id}>
              <MeetingCard meeting={meeting} isCurrent={meeting.date === currentSunday} />
            </li>
          ))}
        </ul>
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        totalMeetings={totalMeetings}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
}
