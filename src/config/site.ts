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
  url: 'https://borrissol.netlify.app',
  locale: 'es_ES',
  logo: '/logo.svg',
  defaultOgImage: '/og-default.png',

  business: {
    type: 'LocalBusiness',
    name: 'Borrissol Espai Creatiu',
    description:
      'Espai creatiu de tallers tèxtils a Mataró. Especialistes en tufting, bordats i experiències artístiques.',
    email: 'borrissolespaicreatiu@gmail.com',
    telephone: '+34673247520',
    address: {
      streetAddress: '',
      addressLocality: 'Mataró',
      addressRegion: 'Catalunya',
      postalCode: '',
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
