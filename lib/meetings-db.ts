import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";
import { addWeeks, getMostRecentSunday } from "./dates";

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

// Helper to map DB row snake_case columns to camelCase SacramentMeeting interface
function mapRow(row: any): SacramentMeeting {
  return {
    id: row.id,
    date: row.date instanceof Date ? row.date.toISOString().split("T")[0] : String(row.date),
    meetingType: row.meeting_type,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements || [],
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business || [],
    stakeBusiness: row.stake_business ?? false,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers || [],
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

/** All meetings, newest first. Optionally filter by date, or search query. */
export async function getMeetings(date?: string, query?: string): Promise<SacramentMeeting[]> {
  const sql = getSql();
  let rows;
  
  if (date) {
    rows = await sql`SELECT * FROM meetings WHERE date = ${date} ORDER BY date DESC`;
  } else if (query) {
    const q = `%${query}%`;
    rows = await sql`
      SELECT * FROM meetings 
      WHERE presiding ILIKE ${q} 
         OR conducting ILIKE ${q} 
         OR meeting_type ILIKE ${q}
         OR EXISTS (
           SELECT 1 FROM jsonb_array_elements(speakers) AS s 
           WHERE s->>'name' ILIKE ${q} OR s->>'topic' ILIKE ${q}
         )
      ORDER BY date DESC
    `;
  } else {
    rows = await sql`SELECT * FROM meetings ORDER BY date DESC`;
  }
  
  return rows.map(mapRow);
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | undefined> {
  const sql = getSql();
  const rows = await sql`SELECT * FROM meetings WHERE id = ${id}`;
  if (rows.length === 0) return undefined;
  return mapRow(rows[0]);
}

/** The meeting for the most recent Sunday (falls back to the newest meeting). */
export async function getCurrentMeeting(): Promise<SacramentMeeting | undefined> {
  const sunday = getMostRecentSunday();
  const meetings = await getMeetings(sunday);
  if (meetings.length > 0) return meetings[0];
  const all = await getMeetings();
  return all[0];
}

// Stubs for mutation functions
export async function addMeeting(meeting: Omit<SacramentMeeting, "id">): Promise<number> {
  const sql = getSql();
  const res = await sql`
    INSERT INTO meetings (
      date, meeting_type, presiding, conducting, announcements, 
      opening_hymn, opening_prayer, ward_business, stake_business, 
      sacrament_hymn, speakers, closing_hymn, closing_prayer
    ) VALUES (
      ${meeting.date}, ${meeting.meetingType}, ${meeting.presiding}, ${meeting.conducting}, ${meeting.announcements},
      ${JSON.stringify(meeting.openingHymn)}::jsonb, ${meeting.openingPrayer}, ${JSON.stringify(meeting.wardBusiness)}::jsonb, ${meeting.stakeBusiness},
      ${JSON.stringify(meeting.sacramentHymn)}::jsonb, ${JSON.stringify(meeting.speakers)}::jsonb, ${JSON.stringify(meeting.closingHymn)}::jsonb, ${meeting.closingPrayer}
    ) RETURNING id;
  `;
  return res[0].id;
}

export async function updateMeeting(id: number, meeting: Partial<SacramentMeeting>): Promise<void> {
  // Stub for Week 04 forms
}

export async function deleteMeeting(id: number): Promise<void> {
  // Stub for Week 04 forms
}
