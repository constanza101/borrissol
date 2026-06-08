// Seasonal / time-limited offerings.
//
// A landing + its home card render only while the offering is upcoming or
// running. They auto-hide on the first build AFTER `endDate` — the content is
// never lost, so bumping the dates next year brings it back.
//
// Because the site is statically generated, visibility is evaluated at BUILD
// time, not per request. So the page hides on the next deploy after `endDate`.
// To hide it ON the date without a manual deploy, schedule a Netlify rebuild
// shortly after `endDate`.

export interface SeasonalEvent {
  enabled: boolean;
  /** ISO date (YYYY-MM-DD), first day — informational. */
  startDate: string;
  /** ISO date (YYYY-MM-DD), last day inclusive. Hidden after this day ends. */
  endDate: string;
}

export const summerLab: SeasonalEvent = {
  enabled: true,
  startDate: '2026-06-22',
  endDate: '2026-07-24',
};

/** True while the event is enabled and today is on/before the end day. */
export function isSeasonalVisible(event: SeasonalEvent, now: Date = new Date()): boolean {
  if (!event.enabled) return false;
  return now <= new Date(`${event.endDate}T23:59:59`);
}

export const isSummerLabVisible = (now?: Date) => isSeasonalVisible(summerLab, now);
