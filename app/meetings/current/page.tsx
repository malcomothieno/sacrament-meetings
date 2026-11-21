import { connection } from "next/server";
import { notFound, redirect } from "next/navigation";
import { getCurrentMeeting } from "@/lib/meetings-db";

export default async function CurrentMeetingPage() {
  // Opt into request-time rendering so "current Sunday" is never frozen at build time.
  await connection();

  const meeting = await getCurrentMeeting();
  if (!meeting) notFound();

  redirect(`/meetings/${meeting.id}`);
}
