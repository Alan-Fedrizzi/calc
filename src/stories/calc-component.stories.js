import { html } from 'lit-html';

export default {
  title: 'Components/Calc Component',
};

const Template = ({ responsiveSize }) => {
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

};
