// Real Google reviews. Single source of truth for both the on-page testimonials
// carousel (TestimonialsSection) and the LocalBusiness structured data (Seo).
//
// `name` is the reviewer's display name; `key` points to the review text in the
// i18n catalog (so it's shown in the page's language). All current reviews are
// 5 stars, matching what's displayed.
//
// Keep AGGREGATE in sync with the real Google Business Profile numbers.

export interface Review {
  name: string;
  key: string;
}

export const REVIEWS: Review[] = [
  { name: 'Marne M.',       key: 'testimonials.r1'  },
  { name: 'Aza',            key: 'testimonials.r2'  },
  { name: 'Marta L.',       key: 'testimonials.r3'  },
  { name: 'Alba L.',        key: 'testimonials.r4'  },
  { name: 'Veronica T.',    key: 'testimonials.r5'  },
  { name: 'María Paula M.', key: 'testimonials.r6'  },
  { name: 'Betsabeth O.',   key: 'testimonials.r7'  },
  { name: 'Patricia B.',    key: 'testimonials.r8'  },
  { name: 'Magí C.',        key: 'testimonials.r9'  },
  { name: 'Sandra L.',      key: 'testimonials.r10' },
  { name: 'Lluís J.',       key: 'testimonials.r11' },
  { name: 'Gerard A.',      key: 'testimonials.r12' },
];

/** Real Google Business Profile totals — update when they change. */
export const REVIEW_AGGREGATE = {
  ratingValue: '5.0',
  reviewCount: '28',
};
