// Central config — every SEO token and business detail lives here.
// Update these values before going live; they feed Seo.astro and JSON-LD.

type SchemaBusinessType = 'ProfessionalService' | 'LocalBusiness' | 'ArtGallery';

interface PostalAddress {
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry: string;
}

interface BusinessConfig {
  type: SchemaBusinessType;
  name: string;
  description: string;
  email?: string;
  telephone?: string;
  address: PostalAddress;
  priceRange?: string;
  openingHours?: string[];
  sameAs?: string[];
}

interface SiteConfig {
  name: string;
  url: string;
  locale: string;
  logo: string;
  defaultOgImage: string;
  twitter?: string;
  business: BusinessConfig;
}

export const SITE: SiteConfig = {
  name: 'Arte que conecta',
  url: 'https://artequeconecta.com',   // ← replace before go-live
  locale: 'es_ES',
  logo: '/logo.svg',
  defaultOgImage: '/og-default.png',
  twitter: '@artequeconecta',           // ← replace or remove if no Twitter

  business: {
    type: 'ProfessionalService',
    name: 'Arte que conecta',
    description:
      'Servicios creativos, tienda de arte y portfolio. Conectamos artistas con su audiencia a través del diseño y la creatividad.',
    email: 'hola@artequeconecta.com',   // ← replace
    telephone: '',                       // ← add when known, e.g. '+34 600 000 000'
    address: {
      streetAddress: '',                 // ← add street when known
      addressLocality: '',               // ← city, e.g. 'Madrid'
      addressRegion: '',                 // ← region, e.g. 'Madrid'
      postalCode: '',                    // ← e.g. '28001'
      addressCountry: 'ES',
    },
    priceRange: '€€',
    openingHours: ['Mo-Fr 09:00-18:00'],
    sameAs: [
      // Add live URLs before publishing:
      // 'https://www.instagram.com/artequeconecta',
      // 'https://www.facebook.com/artequeconecta',
    ],
  },
};
