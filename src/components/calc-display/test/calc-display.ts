import { newE2EPage } from '@stencil/core/testing';

describe('calc-display', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<calc-display></calc-display>');

    const element = await page.find('calc-display');
    expect(element).toHaveClass('hydrated');
  });
});
