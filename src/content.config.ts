import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: ['*.mdoc', '**/*.mdoc'], base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(160),
    publishedAt: z.union([z.string(), z.date()]).transform(v =>
      v instanceof Date ? v.toISOString().split('T')[0] : v
    ),
    coverImage: z.string().optional(),
  }),
});

export const collections = { blog };
