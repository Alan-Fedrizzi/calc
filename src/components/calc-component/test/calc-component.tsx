import { newSpecPage } from '@stencil/core/testing';
import { CalcComponent } from '../calc-component';

describe('calc-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CalcComponent],
      html: `<calc-component></calc-component>`,
    });
    expect(page.root).toEqualHtml(`
      <calc-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </calc-component>
    `);
  });
});
