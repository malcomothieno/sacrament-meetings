import type { MeetingType } from "./types";

export const MEETING_TYPE_LABELS: Record<MeetingType, string> = {
  regular: "Regular Sacrament Meeting",
  testimony: "Fast & Testimony Meeting",
  stake: "Stake Meeting",
  general: "General Meeting",
};

/** Stake and general meetings do not include the sacrament. */
export function hasSacrament(type: MeetingType): boolean {
  return type === "regular" || type === "testimony";
}
