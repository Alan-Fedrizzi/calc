import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'calc-component',
  styleUrl: 'calc-component.scss',
  shadow: true,
})
export class CalcComponent {
  render() {
    return (
      <Host class="calc-component">
        <calc-container>
          <div class="calc-component__column">
            <calc-display calc-data="150 - 210" calc-input="210"></calc-display>
            <div class="calc-component__grid">
              <calc-button button-type="clear" button-color="green"></calc-button>
              <calc-button button-type="number-9"></calc-button>
              <calc-button button-type="number-8"></calc-button>
              <calc-button button-type="number-7"></calc-button>
              <calc-button button-type="number-6"></calc-button>
              <calc-button button-type="number-4"></calc-button>
              <calc-button button-type="number-5"></calc-button>
              <calc-button button-type="number-3"></calc-button>
              <calc-button button-type="number-2"></calc-button>
              <calc-button button-type="number-1"></calc-button>
              <calc-button button-type="number-0"></calc-button>
              <calc-button button-type="divide"></calc-button>
              <calc-button button-type="multiply"></calc-button>
              <calc-button button-type="subtract"></calc-button>
              <calc-button button-type="add"></calc-button>
              <calc-button button-type="equal" button-color="red"></calc-button>
            </div>
          </div>
        </calc-container>
      </Host>
    );
  }
}
