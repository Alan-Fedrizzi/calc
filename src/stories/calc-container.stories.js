import { html } from 'lit-html';

export default {
  title: 'Components/Calc Container',
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
      <calc-container>
        <div>
          <h1 class="dummy-text">This is a dummy text</h1>
          <h3 class="dummy-text">Just to simulate some content inside this component</h3>
          <p class="dummy-text">Ok?</p>
          <calc-button button-type="number-5"></calc-button>
          <calc-button button-type="equal" color="green"></calc-button>
          <calc-button button-type="divide" color="red"></calc-button>
        </div>
      </calc-container>
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
