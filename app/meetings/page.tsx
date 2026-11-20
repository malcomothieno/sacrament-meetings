import type { Metadata } from "next";
import MeetingCard from "@/components/MeetingCard";
import { getBaseUrl } from "@/lib/api";
import { getMostRecentSunday } from "@/lib/dates";
import type { SacramentMeeting } from "@/lib/types";

export const metadata: Metadata = { title: "All Meetings" };

export default async function MeetingsPage() {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/meetings`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to load meetings (status ${response.status})`);
  }

  const meetings = (await response.json()) as SacramentMeeting[];
  const currentSunday = getMostRecentSunday();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">All Meetings</h1>
      {meetings.length === 0 ? (
        <p className="text-muted">No meetings have been planned yet.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {meetings.map((meeting) => (
            <li key={meeting.id}>
              <MeetingCard meeting={meeting} isCurrent={meeting.date === currentSunday} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
