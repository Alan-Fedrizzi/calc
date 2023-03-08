import { html } from 'lit-html';

export default {
  title: 'Components/Calc Display',
};

const Template = ({ darkMode }) => {
  return html`
    <style>
      .container {
        display: flex;
        gap: 16px;
        background: var(--background-light-general);
        padding: 32px;
      }

      .dummy-text {
        color: var(--color-dark-2);
      }
    </style>

    <div class="container ${darkMode ? 'dark-mode' : ''}">
      <!-- component markdown -->
      <calc-display>
        <span> Teste... </span>
      </calc-display>
      <!-- !component markdown -->
    </div>
  `;
};

export const Default = Template.bind({});
Default.argTypes = {
  darkMode: {
    darkMode: false,
    control: { type: 'boolean' },
    defautlValue: false,
  },
};
