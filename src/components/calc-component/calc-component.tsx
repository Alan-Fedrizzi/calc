import { Component, Host, h, Listen, Element, Prop } from '@stencil/core';

@Component({
  tag: 'calc-component',
  styleUrl: 'calc-component.scss',
  shadow: true,
})
export class CalcComponent {
  @Element() hostElement!: HTMLElement;
  calcDisplayElement: HTMLElement;

  @Prop() calcDisplayInput: string = '';
  @Prop() calcDisplayData: string = '';

  componentDidLoad() {
    this.calcDisplayElement = this.hostElement.shadowRoot.querySelector('calc-display');
  }

  setCalcDisplayInput(text: string) {
    this.calcDisplayInput = this.calcDisplayInput + text;
    this.calcDisplayElement.setAttribute('calc-input', this.calcDisplayInput);
  }

  clearCalcDisplay() {
    this.clearCalcDisplayData();
    this.clearCalcDisplayInput();
  }

  clearCalcDisplayData() {
    this.calcDisplayElement.setAttribute('calc-data', '');
  }

  clearCalcDisplayInput() {
    this.calcDisplayElement.setAttribute('calc-input', '');
    this.calcDisplayInput = '';
  }

  transferToDisplayData() {
    const calcInputText = this.calcDisplayElement.getAttribute('calc-input');
    this.calcDisplayElement.setAttribute('calc-data', calcInputText);
    this.clearCalcDisplayInput();
  }

  onCalcButtonClickNumber() {
    console.log('number');
  }

  onCalcButtonClickOperation() {
    console.log('operation');
  }

  @Listen('buttonClick', { target: 'body' })
  onCalcButtonClick(event: CustomEvent) {
    for (let i = 0; i <= 9; i++) {
      if (event.detail === `number-${i}`) {
        this.setCalcDisplayInput(i.toString());
      }
    }
    if (event.detail === 'clear') {
      this.clearCalcDisplay();
    }
    if (event.detail === 'add') {
      this.setCalcDisplayInput(' + ');
      this.transferToDisplayData();
    }
    if (event.detail === 'subtract') {
      this.setCalcDisplayInput(' - ');
      this.transferToDisplayData();
    }
    if (event.detail === 'multiply') {
      this.setCalcDisplayInput(' x ');
      this.transferToDisplayData();
    }
    if (event.detail === 'divide') {
      this.setCalcDisplayInput(' ÷ ');
      this.transferToDisplayData();
    }
    if (event.detail === 'equal') {
      this.setCalcDisplayInput('=');
    }
    if (event.detail === 'backspace') {
      this.setCalcDisplayInput('erase');
    }
    if (event.detail === 'sqrt') {
      this.setCalcDisplayInput('√');
    }
    if (event.detail === 'square') {
      this.setCalcDisplayInput('²');
    }
    if (event.detail === 'dot') {
      this.setCalcDisplayInput(',');
    }
  }

  render() {
    return (
      <Host class="calc-component">
        <calc-container>
          <div class="calc-component__column">
            <calc-display calc-data="" calc-input=""></calc-display>
            <div class="calc-component__grid">
              <calc-button button-type="clear" button-color="green"></calc-button>
              <calc-button button-type="sqrt"></calc-button>
              <calc-button button-type="square"></calc-button>
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
              <calc-button button-type="dot"></calc-button>
              <calc-button button-type="backspace"></calc-button>
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
