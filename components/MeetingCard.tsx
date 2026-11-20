import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";
import { formatMeetingDate } from "@/lib/dates";
import { MEETING_TYPE_LABELS } from "@/lib/labels";

interface MeetingCardProps {
  meeting: SacramentMeeting;
  isCurrent?: boolean;
}

export default function MeetingCard({ meeting, isCurrent = false }: MeetingCardProps) {
  const speakerCount = meeting.speakers.filter((s) => s.type === "speaker").length;

  return (
    <article className="rounded-lg border border-line bg-surface p-4 shadow-sm">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-brand-light px-3 py-0.5 text-sm font-semibold text-brand">
          {MEETING_TYPE_LABELS[meeting.meetingType]}
        </span>
        {isCurrent && (
          <span className="rounded-full bg-accent-light px-3 py-0.5 text-sm font-semibold text-accent">
            This week
          </span>
        )}
      </div>
      <h2 className="mb-2 text-xl font-bold">
        <Link
          href={`/meetings/${meeting.id}`}
          className="hover:underline focus-visible:underline"
        >
          {formatMeetingDate(meeting.date)}
        </Link>
      </h2>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm text-muted">
        <dt className="font-semibold">Presiding:</dt>
        <dd>{meeting.presiding}</dd>
        <dt className="font-semibold">Conducting:</dt>
        <dd>{meeting.conducting}</dd>
        <dt className="font-semibold">Speakers:</dt>
        <dd>{speakerCount}</dd>
      </dl>
    </article>
  );
}
