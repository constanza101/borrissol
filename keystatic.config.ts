import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'constanza101/borrissol',
    branchPrefix: 'keystatic/',
  },
  ui: {
    brand: { name: 'Borrissol' },
  },
  collections: {
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: { label: 'Títol' },
          slug: { label: 'URL (slug)', description: 'S\'omple automàticament. Ex: com-funciona-el-tufting' },
        }),
        summary: fields.text({
          label: 'Resum',
          description: 'Apareix a la llista del blog i a Google (màx. 160 caràcters)',
          multiline: true,
          validation: { length: { max: 160 } },
        }),
        publishedAt: fields.date({
          label: 'Data de publicació',
          validation: { isRequired: true },
        }),
        coverImage: fields.image({
          label: 'Imatge destacada',
          description: 'Imatge principal de l\'entrada. Mínim 1200×630px recomanat.',
          directory: 'public/blog/images',
          publicPath: '/blog/images/',
        }),
        content: fields.markdoc({
          label: 'Contingut',
        }),
      },
    }),
  },
});
