// Seasonal / time-limited offerings.
//
// Controls whether the *promotional home card* for an offering is shown. The
// landing page itself stays live year-round (so it keeps its search ranking);
// only the card auto-hides on the first build AFTER `endDate`. Nothing is lost
// — bump the dates next year to show the card again.
//
// Because the site is statically generated, visibility is evaluated at BUILD
// time, not per request. So the card hides on the next deploy after `endDate`.
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
  // Belén is running the summer workshop past its original dates; keep the home
  // card visible through September (hides on the first build after this day).
  endDate: '2026-09-30',
};

/** True while the event is enabled and today is on/before the end day. */
export function isSeasonalVisible(event: SeasonalEvent, now: Date = new Date()): boolean {
  if (!event.enabled) return false;
  return now <= new Date(`${event.endDate}T23:59:59`);
}

export const isSummerLabVisible = (now?: Date) => isSeasonalVisible(summerLab, now);
