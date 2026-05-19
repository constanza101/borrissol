import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(160),
    publishedAt: z.string(),
    coverImage: z.string().optional(),
  }),
});

export const collections = { blog };
