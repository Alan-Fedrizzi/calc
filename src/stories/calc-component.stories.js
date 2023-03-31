import { html } from 'lit-html';

export default {
  title: 'Components/Calc Component',
};

const Template = ({ darkMode, responsiveSize }) => {
  return html`
    <style>
      .container {
        display: flex;
        gap: 16px;
        background: var(--background-light-general);
        padding: 16px;
      }

      .dummy-text {
        color: var(--color-dark-2);
      }

      .oie {
        height: 24px;
        width: 24px;
        stroke: red;
      }
    </style>

    <div class="container ${darkMode ? 'dark-mode' : ''}">
      <!-- component markdown -->
      <calc-component ?responsive-size=${responsiveSize}></calc-component>
      <!-- !component markdown -->
    </div>
  `;
};

export const Default = Template.bind({});
Default.argTypes = {
  responsiveSize: {
    responsiveSize: false,
    control: { type: 'boolean' },
    defautlValue: false,
  },
  darkMode: {
    darkMode: false,
    control: { type: 'boolean' },
    defautlValue: false,
  },
};
