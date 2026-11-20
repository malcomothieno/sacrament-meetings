import type { SacramentMeeting } from "./types";
import { addWeeks, getMostRecentSunday } from "./dates";

/**
 * Temporary in-memory data for Week 02. Dates are generated relative to the
 * most recent Sunday so "/meetings/current" always has a meeting to show.
 * Hymn numbers follow the 1985 LDS hymnbook. Names are sample data.
 */
function buildMeetings(): SacramentMeeting[] {
  const thisSunday = getMostRecentSunday();
  const week = (offset: number): string => addWeeks(thisSunday, offset);

  return [
    {
      id: 1,
      date: week(-5),
      meetingType: "regular",
      presiding: "Bishop Anderson",
      conducting: "Brother Carter",
      announcements: [
        "Ward choir practice is Wednesday at 7:00 PM.",
        "Please sign up for the service project on the foyer table.",
      ],
      openingHymn: { number: 2, title: "The Spirit of God" },
      openingPrayer: "Sister Nguyen",
      wardBusiness: [
        { description: "Release of Brother Lopez as Ward Activities Chair." },
        { description: "Sustaining of Sister Patel as Ward Activities Chair." },
      ],
      stakeBusiness: false,
      sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
      speakers: [
        { name: "Brother Hughes", topic: "Faith in Jesus Christ", type: "speaker" },
        { name: "Primary Children", topic: "I Am a Child of God", type: "musical-number" },
        { name: "Sister Okafor", topic: "Serving One Another", type: "speaker" },
      ],
      closingHymn: { number: 85, title: "How Firm a Foundation" },
      closingPrayer: "Brother Davis",
    },
    {
      id: 2,
      date: week(-4),
      meetingType: "testimony",
      presiding: "Bishop Anderson",
      conducting: "Brother Carter",
      announcements: ["Fast Sunday: fast offerings may be given to the bishopric."],
      openingHymn: { number: 3, title: "Now Let Us Rejoice" },
      openingPrayer: "Brother Evans",
      wardBusiness: [],
      stakeBusiness: false,
      sacramentHymn: { number: 172, title: "In Humility, Our Savior" },
      speakers: [],
      closingHymn: { number: 136, title: "I Know That My Redeemer Lives" },
      closingPrayer: "Sister Brooks",
    },
    {
      id: 3,
      date: week(-3),
      meetingType: "regular",
      presiding: "Bishop Anderson",
      conducting: "Brother Carter",
      announcements: ["Ward temple night is Thursday at 6:30 PM."],
      openingHymn: { number: 19, title: "We Thank Thee, O God, for a Prophet" },
      openingPrayer: "Sister Mensah",
      wardBusiness: [{ description: "New members: the Rivera family." }],
      stakeBusiness: false,
      sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
      speakers: [
        { name: "Sister Johnson", topic: "The Atonement", type: "speaker" },
        { name: "Brother Kim", topic: "Gratitude", type: "speaker" },
      ],
      closingHymn: { number: 30, title: "Come, Come, Ye Saints" },
      closingPrayer: "Brother Walker",
    },
    {
      id: 4,
      date: week(-2),
      meetingType: "general",
      presiding: "Bishop Anderson",
      conducting: "Brother Carter",
      announcements: ["General Conference is viewed from home this week."],
      openingHymn: { number: 1, title: "The Morning Breaks" },
      openingPrayer: "Brother Taylor",
      wardBusiness: [],
      stakeBusiness: false,
      sacramentHymn: { number: 172, title: "In Humility, Our Savior" },
      speakers: [],
      closingHymn: { number: 5, title: "High on the Mountain Top" },
      closingPrayer: "Sister Adams",
    },
    {
      id: 5,
      date: week(-1),
      meetingType: "regular",
      presiding: "Bishop Anderson",
      conducting: "Brother Carter",
      announcements: [
        "Youth activity: Wednesday at 7:00 PM.",
        "Ward potluck dinner is Saturday at 5:00 PM.",
      ],
      openingHymn: { number: 2, title: "The Spirit of God" },
      openingPrayer: "Sister Park",
      wardBusiness: [{ description: "Sustaining of Brother Young as Elders Quorum Secretary." }],
      stakeBusiness: true,
      sacramentHymn: { number: 172, title: "In Humility, Our Savior" },
      speakers: [
        { name: "Brother Foster", topic: "Ministering", type: "speaker" },
        { name: "Sister Reyes", topic: "Hope", type: "speaker" },
        { name: "Youth Quartet", topic: "I Stand All Amazed", type: "musical-number" },
      ],
      closingHymn: { number: 193, title: "I Stand All Amazed" },
      closingPrayer: "Brother Clark",
    },
    {
      id: 6,
      date: week(0),
      meetingType: "regular",
      presiding: "Bishop Anderson",
      conducting: "Brother Carter",
      announcements: ["Ward council meets Sunday after church."],
      openingHymn: { number: 5, title: "High on the Mountain Top" },
      openingPrayer: "Brother Mitchell",
      wardBusiness: [],
      stakeBusiness: false,
      sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
      speakers: [
        { name: "Sister Thompson", topic: "Finding Peace in Christ", type: "speaker" },
        { name: "Brother Owusu", topic: "Keeping Covenants", type: "speaker" },
      ],
      closingHymn: { number: 85, title: "How Firm a Foundation" },
      closingPrayer: "Sister Hall",
    },
    {
      id: 7,
      date: week(1),
      meetingType: "stake",
      presiding: "President Lewis (Stake Presidency)",
      conducting: "Brother Carter",
      announcements: ["Stake conference: no ward meetings are held this week."],
      openingHymn: { number: 19, title: "We Thank Thee, O God, for a Prophet" },
      openingPrayer: "To be assigned",
      wardBusiness: [],
      stakeBusiness: true,
      sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
      speakers: [
        { name: "President Lewis", topic: "Stake Goals", type: "speaker" },
      ],
      closingHymn: { number: 30, title: "Come, Come, Ye Saints" },
      closingPrayer: "To be assigned",
    },
  ];
}

/** All meetings, newest first. Optionally filter by 'YYYY-MM-DD'. */
export function getMeetings(date?: string): SacramentMeeting[] {
  const all = buildMeetings().sort((a, b) => b.date.localeCompare(a.date));
  return date ? all.filter((m) => m.date === date) : all;
}

export function getMeetingById(id: number): SacramentMeeting | undefined {
  return buildMeetings().find((m) => m.id === id);
}

/** The meeting for the most recent Sunday (falls back to the newest meeting). */
export function getCurrentMeeting(): SacramentMeeting | undefined {
  const sunday = getMostRecentSunday();
  const meetings = getMeetings();
  return meetings.find((m) => m.date === sunday) ?? meetings[0];
}
