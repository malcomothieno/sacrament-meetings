import Link from "next/link";
import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import PrintButton from "@/components/PrintButton";
import { getMeetingById } from "@/lib/meetings-db";
import DeleteMeetingButton from "@/components/DeleteMeetingButton";

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);
  if (isNaN(numericId)) notFound();

  const meeting = await getMeetingById(numericId);
  if (!meeting) notFound();

  return (
    <div>
      <div className="mb-4 flex items-center justify-between print:hidden">
        <Link href="/meetings" className="font-semibold text-brand underline">
          &larr; Back to all meetings
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href={`/meetings/${id}/edit`}
            className="rounded bg-brand px-3 py-1 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Edit Meeting
          </Link>
          <DeleteMeetingButton id={meeting.id} />
          <PrintButton />
        </div>
      </div>
      <MeetingDetail meeting={meeting} />
    </div>
  );
}
