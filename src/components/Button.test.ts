import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import Button from './Button.astro';

describe('Button component', () => {
  it('applies "btn btn-primary" classes by default', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button);
    expect(html).toContain('class="btn btn-primary"');
  });

  it('applies "btn btn-secondary" for the secondary variant', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button, {
      props: { variant: 'secondary' },
    });
    expect(html).toContain('class="btn btn-secondary"');
  });

  it('applies "btn btn-tertiary" for the tertiary variant', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button, {
      props: { variant: 'tertiary' },
    });
    expect(html).toContain('class="btn btn-tertiary"');
  });

  it('sets the type attribute correctly', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button, {
      props: { type: 'submit' },
    });
    expect(html).toContain('type="submit"');
  });

  it('defaults to type="button" to prevent accidental form submission', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button);
    expect(html).toContain('type="button"');
  });
});
