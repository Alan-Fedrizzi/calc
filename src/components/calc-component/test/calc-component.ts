import { newE2EPage } from '@stencil/core/testing';

describe('calc-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<calc-component></calc-component>');

    const element = await page.find('calc-component');
    expect(element).toHaveClass('hydrated');
  });
});
