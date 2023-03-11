import { Component, Host, h, Listen, Element, Prop } from '@stencil/core';

@Component({
  tag: 'calc-component',
  styleUrl: 'calc-component.scss',
  shadow: true,
})
export class CalcComponent {
  @Element() hostElement!: HTMLElement;
  calcDisplayElement: HTMLElement;
  operationType: string;
  // n1: number;

  @Prop() calcDisplayInput: string = '';
  @Prop() calcDisplayData: string = '';

  componentDidLoad() {
    this.calcDisplayElement = this.hostElement.shadowRoot.querySelector('calc-display');
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

  setCalcDisplayInput(text: string) {
    this.calcDisplayInput = this.calcDisplayInput + text;
    this.calcDisplayElement.setAttribute('calc-input', this.calcDisplayInput);
  }

  setCalcDisplayData(text: string) {
    const calcDataText = this.calcDisplayElement.getAttribute('calc-data');
    this.calcDisplayData = calcDataText + text;
    this.calcDisplayElement.setAttribute('calc-data', this.calcDisplayData);
  }

  transferToDisplayData() {
    const calcInputText = this.calcDisplayElement.getAttribute('calc-input');
    this.calcDisplayElement.setAttribute('calc-data', calcInputText);
    this.clearCalcDisplayInput();
  }

  showResult(result: string) {
    this.calcDisplayElement.setAttribute('calc-input', result);
  }

  onButtonClickBasicOperations(clickType: string) {
    let operationString = '';
    this.operationType = clickType;
    if (this.operationType === 'add') {
      operationString = ' + ';
    }
    if (this.operationType === 'subtract') {
      operationString = ' - ';
    }
    if (this.operationType === 'multiply') {
      operationString = ' x ';
    }
    if (this.operationType === 'divide') {
      operationString = ' ÷ ';
    }
    this.setCalcDisplayInput(operationString);
    this.transferToDisplayData();
  }

  basicOperation() {
    const calcInputText = this.calcDisplayElement.getAttribute('calc-input');
    this.setCalcDisplayData(calcInputText);
    const calcDataText = this.calcDisplayElement.getAttribute('calc-data').split(' ');

    let result = 0;
    let count = 0;

    calcDataText.forEach(member => {
      if (count === 0) {
        result = +member;
      }
      if (!Number.isNaN(+member) && count !== 0) {
        if (this.operationType === 'add') {
          result = result + +member;
        }
        if (this.operationType === 'subtract') {
          result = result - +member;
        }
        if (this.operationType === 'multiply') {
          result = result * +member;
        }
        if (this.operationType === 'divide') {
          result = result / +member;
        }
      }
      count++;
    });
    this.showResult(result.toString());
    this.operationType = '';
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
    if (event.detail === 'equal') {
      this.basicOperation();
    }
    if (event.detail === 'add' || event.detail === 'subtract' || event.detail === 'multiply' || event.detail === 'divide') {
      this.onButtonClickBasicOperations(event.detail);
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
