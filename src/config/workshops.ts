// Tufting workshop formats — single source of truth for the service-selection
// panel in WorkshopsSection. Prices/sizes are locale-independent business data;
// the *Key fields point into the i18n catalog so the visible labels follow the
// page language (same pattern as reviews.ts).
//
// Update prices/sizes here when the offer changes — no component edits needed.

export interface TuftingFormat {
  /** Commercial name of the format (proper noun, not translated). */
  name: string;
  size: string;
  price: string;
  levelKey: string;
  durationKey: string;
  drawingKey: string;
  finishingKey: string;
  /** i18n key of the prefilled WhatsApp message for this format. */
  waKey: string;
}

export const TUFTING_FORMATS: TuftingFormat[] = [
  {
    name: 'Pelusa',
    size: '50×50 cm',
    price: '78€',
    levelKey:     'tufting.level.express',
    durationKey:  'tufting.dur.4',
    drawingKey:   'tufting.drawing.basic',
    finishingKey: 'tufting.finishing.simple',
    waKey:        'wa.tufting.pelusa',
  },
  {
    name: 'Floc',
    size: '50×50 cm',
    price: '108€',
    levelKey:     'tufting.level.intro',
    durationKey:  'tufting.dur.6',
    drawingKey:   'tufting.drawing.basic',
    finishingKey: 'tufting.finishing.improved',
    waKey:        'wa.tufting.floc',
  },
  {
    name: 'Vellut',
    size: '70×70 cm',
    price: '158€',
    levelKey:     'tufting.level.intermediate',
    durationKey:  'tufting.dur.8',
    drawingKey:   'tufting.drawing.choice',
    finishingKey: 'tufting.finishing.improved',
    waKey:        'wa.tufting.vellut',
  },
  {
    name: 'Pelut',
    size: '80×80 cm',
    price: '181€',
    levelKey:     'tufting.level.pro',
    durationKey:  'tufting.dur.10',
    drawingKey:   'tufting.drawing.choice',
    finishingKey: 'tufting.finishing.improved',
    waKey:        'wa.tufting.pelut',
  },
];
