import { html } from 'lit-html';

export default {
  title: 'Components/Calc Display',
};

const Template = ({ calcData, calcInput }) => {
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

      .dummy-text {
        color: var(--color-dark-2);
      }
    </style>

    <div class="container">
      <!-- component markdown -->
      <calc-display calc-data="${calcData}" calc-input="${calcInput}"> </calc-display>
      <!-- !component markdown -->
    </div>
  `;
};

export const Default = Template.bind({});
Default.argTypes = {
  calcData: {
    control: { type: 'text' },
    defaultValue: '95 - 210',
  },
  calcInput: {
    control: { type: 'text' },
    defaultValue: '210',
  },
};
