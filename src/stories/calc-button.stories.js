import { html } from 'lit-html';
import { EnumButtonType } from './../utils/utils';

export default {
  title: 'Components/Calc Button',
};

const Template = ({ buttonType, buttonColor, darkMode }) => {
  return html`
    <style>
      .container {
        display: flex;
        gap: 16px;
        background: var(--background-light-general);
        height: 300px;
        padding: 32px;
      }
    </style>

    <div class="container ${darkMode ? 'dark-mode' : ''}">
      <!-- component markdown -->
      <calc-button button-type=${buttonType} button-color=${buttonColor}></calc-button>
      <!-- !component markdown -->
    </div>
  `;
};

export const Default = Template.bind({});
Default.argTypes = {
  buttonType: {
    options: [...Object.values(EnumButtonType)],
    control: {
      type: 'select',
    },
    defaultValue: 'number-0',
  },
  buttonColor: {
    options: [undefined, 'green', 'red'],
    control: {
      type: 'select',
    },
    defaultValue: undefined,
  },
  darkMode: {
    darkMode: false,
    control: { type: 'boolean' },
    defautlValue: false,
  },
};
