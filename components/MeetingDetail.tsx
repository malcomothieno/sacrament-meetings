import type { Hymn, SacramentMeeting } from "@/lib/types";
import { formatMeetingDate } from "@/lib/dates";
import { MEETING_TYPE_LABELS, hasSacrament } from "@/lib/labels";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

function HymnLine({ hymn }: { hymn: Hymn }) {
  return (
    <p>
      #{hymn.number} &ndash; {hymn.title}
    </p>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-4 break-inside-avoid">
      <h2 className="mb-2 text-xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const sacrament = hasSacrament(meeting.meetingType);
  const isTestimony = meeting.meetingType === "testimony";

  return (
    <article>
      <header className="mb-4">
        <p className="font-semibold text-accent">{MEETING_TYPE_LABELS[meeting.meetingType]}</p>
        <h1 className="mb-2 text-3xl font-bold">{formatMeetingDate(meeting.date)}</h1>
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
          <dt className="font-semibold">Presiding:</dt>
          <dd>{meeting.presiding}</dd>
          <dt className="font-semibold">Conducting:</dt>
          <dd>{meeting.conducting}</dd>
        </dl>
      </header>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <Section title="Announcements">
          <ul className="list-disc pl-6">
            {meeting.announcements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Opening Hymn">
        <HymnLine hymn={meeting.openingHymn} />
      </Section>

      <Section title="Opening Prayer">
        <p>{meeting.openingPrayer}</p>
      </Section>

      <Section title="Ward Business">
        {meeting.wardBusiness.length > 0 ? (
          <ul className="list-disc pl-6">
            {meeting.wardBusiness.map((item) => (
              <li key={item.description}>{item.description}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No ward business this week.</p>
        )}
        <p className="mt-2">
          <span className="font-semibold">Stake business:</span>{" "}
          {meeting.stakeBusiness ? "Yes" : "No"}
        </p>
      </Section>

      <Section title="Sacrament">
        {sacrament ? (
          <>
            <p className="font-semibold">Sacrament Hymn</p>
            <HymnLine hymn={meeting.sacramentHymn} />
          </>
        ) : (
          <p className="text-muted">
            This is a non-sacrament meeting; the sacrament is not administered.
          </p>
        )}
      </Section>

      <Section title={isTestimony ? "Testimonies" : "Speakers & Musical Numbers"}>
        {meeting.speakers.length > 0 ? (
          <ol className="list-decimal space-y-2 pl-6">
            {meeting.speakers.map((item) => (
              <li key={`${item.type}-${item.name}`}>
                <span className="font-semibold">{item.name}</span>
                <span className="text-muted">
                  {" "}
                  ({item.type === "speaker" ? "Speaker" : "Musical number"})
                </span>
                {item.topic && <span> &ndash; {item.topic}</span>}
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-muted">
            {isTestimony
              ? "Members are invited to bear their testimonies."
              : "No speakers or musical numbers assigned."}
          </p>
        )}
      </Section>

      <Section title="Closing Hymn">
        <HymnLine hymn={meeting.closingHymn} />
      </Section>

      <Section title="Closing Prayer">
        <p>{meeting.closingPrayer}</p>
      </Section>
    </article>
  );
}
