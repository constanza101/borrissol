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
  business: BusinessConfig;
}

export const SITE: SiteConfig = {
  name: 'Borrissol',
  url: 'https://borrissol.com',
  locale: 'es_ES',
  logo: '/images/borrissol-logo-b.svg',
  defaultOgImage: '/og-default.png',

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
    priceRange: '€€',
    openingHours: ['Mo-Sa 09:30-13:30', 'Mo-Sa 16:30-20:30'],
    sameAs: [
      'https://www.instagram.com/borrissol_espai_creatiu',
      'https://www.tiktok.com/@borrissol_espai_creatiu',
    ],
  },
};
