import { newE2EPage } from '@stencil/core/testing';

describe('calc-container', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<calc-container></calc-container>');

    const element = await page.find('calc-container');
    expect(element).toHaveClass('hydrated');
  });
});
