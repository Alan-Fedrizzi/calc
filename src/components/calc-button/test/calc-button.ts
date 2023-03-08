import { newE2EPage } from '@stencil/core/testing';

describe('calc-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<calc-button></calc-button>');

    const element = await page.find('calc-button');
    expect(element).toHaveClass('hydrated');
  });
});
