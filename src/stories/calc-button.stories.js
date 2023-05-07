import { html } from 'lit-html';
import { EnumButtonType } from './../utils/utils';

export default {
  title: 'Components/Calc Button',
};

const Template = ({ buttonType, buttonColor, responsiveSize }) => {
  return html`
    <style>
      .container {
        display: flex;
        gap: 16px;
        background: var(--background-light-general);
        height: auto;
        width: 100%;
        padding: 32px;
        box-sizing: border-box;
      }
    </style>

    <div class="container">
      <!-- component markdown -->
      <calc-button button-type=${buttonType} button-color=${buttonColor} ?responsive-size=${responsiveSize}></calc-button>
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
  responsiveSize: {
    responsiveSize: false,
    control: { type: 'boolean' },
    defautlValue: false,
  },
};
