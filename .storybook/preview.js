import { defineCustomElements } from '../dist/esm/loader';
defineCustomElements();
import '../css/themes/default.css';
import '../css/schemes/light.css';
import '../css/colors.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
