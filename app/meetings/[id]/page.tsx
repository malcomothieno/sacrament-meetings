import Link from "next/link";
import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import PrintButton from "@/components/PrintButton";
import { getBaseUrl } from "@/lib/api";
import type { SacramentMeeting } from "@/lib/types";

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/meetings/${encodeURIComponent(id)}`, {
    cache: "no-store",
  });

  // 400 (bad id) and 404 (missing) both mean there is no such meeting page.
  if (response.status === 400 || response.status === 404) notFound();
  if (!response.ok) {
    throw new Error(`Failed to load meeting (status ${response.status})`);
  }

  const meeting = (await response.json()) as SacramentMeeting;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between print:hidden">
        <Link href="/meetings" className="font-semibold text-brand underline">
          &larr; Back to all meetings
        </Link>
        <PrintButton />
      </div>
      <MeetingDetail meeting={meeting} />
    </div>
  );
}
