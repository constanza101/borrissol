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

interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

interface BusinessConfig {
  type: SchemaBusinessType;
  name: string;
  description: string;
  email?: string;
  telephone?: string;
  address: PostalAddress;
  geo?: GeoCoordinates;
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
  business: BusinessConfig;
}

export const SITE: SiteConfig = {
  name: 'Borrissol',
  url: 'https://borrissol.com',
  locale: 'es_ES',
  logo: '/images/borrissol-logo-b-512.png',
  defaultOgImage: '/og-default.jpg',

  business: {
    type: 'LocalBusiness',
    name: 'Borrissol Espai Creatiu',
    description:
      'Espai creatiu de tallers tèxtils a Mataró. Especialistes en tufting, bordats i experiències artístiques.',
    email: 'borrissolespaicreatiu@gmail.com',
    telephone: '+34673247520',
    address: {
      streetAddress: 'Carrer de Sant Antoni, 17, baix',
      addressLocality: 'Mataró',
      addressRegion: 'Catalunya',
      postalCode: '08301',
      addressCountry: 'ES',
    },
    // Coordinates of the physical workshop (Carrer de Sant Antoni 17, Mataró).
    // Feeds the LocalBusiness `geo` node so Google can place the business in
    // the local map pack for "near me" / location-intent searches.
    geo: {
      latitude: 41.5373926,
      longitude: 2.4466578,
    },
    priceRange: '€€',
    openingHours: ['Mo-Sa 09:30-13:30', 'Mo-Sa 16:30-20:30'],
    sameAs: [
      'https://www.instagram.com/borrissol_espai_creatiu',
      'https://www.tiktok.com/@borrissol_espai_creatiu',
    ],
  },
};
