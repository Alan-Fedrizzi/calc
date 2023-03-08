import { newSpecPage } from '@stencil/core/testing';
import { CalcDisplay } from '../calc-display';

describe('calc-display', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CalcDisplay],
      html: `<calc-display></calc-display>`,
    });
    expect(page.root).toEqualHtml(`
      <calc-display>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </calc-display>
    `);
  });
});
