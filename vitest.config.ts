import { getViteConfig } from 'astro/config';

// `getViteConfig` types don't include Vitest's `test` property, but it passes
// it through to Vitest at runtime — cast is safe here.
export default getViteConfig(
  { test: { globals: true, include: ['src/**/*.test.ts'] } } as unknown as Parameters<typeof getViteConfig>[0]
);
