import { Component, Host, h, Listen, Element, Prop } from '@stencil/core';

@Component({
  tag: 'calc-component',
  styleUrl: 'calc-component.scss',
  shadow: true,
})
export class CalcComponent {
  @Element() hostElement!: HTMLElement;
  calcDisplayElement: HTMLCalcDisplayElement;
  operationType: string;
  chaningOperations = false;
  wasResultShowed = false;

  @Prop() calcDisplayInput: string = '';
  @Prop() calcDisplayData: string = '';
  @Prop({ reflect: true, mutable: true }) responsiveSize = false;

  componentDidLoad() {
    this.calcDisplayElement = this.hostElement.shadowRoot.querySelector('calc-display');
  }

  clearCalcDisplay() {
    this.clearCalcDisplayData();
    this.clearCalcDisplayInput();
    this.chaningOperations = false;
  }

  clearCalcDisplayData() {
    this.calcDisplayElement.calcData = '';
  }

  clearCalcDisplayInput() {
    this.calcDisplayElement.calcInput = '';
    this.calcDisplayInput = '';
  }

  setCalcDisplayInput(text: string) {
    this.calcDisplayInput = this.calcDisplayInput + text;
    this.calcDisplayElement.calcInput = this.calcDisplayInput;
  }

  setCalcDisplayInputInFrontAndBack(textFront: string, textBack: string) {
    this.calcDisplayInput = textFront + this.calcDisplayInput + textBack;
    this.calcDisplayElement.calcInput = this.calcDisplayInput;
  }

  setCalcDisplayData(text: string) {
    this.calcDisplayData = this.calcDisplayData + text;
    this.calcDisplayElement.calcData = this.calcDisplayData;
  }

  transferToDisplayData() {
    this.calcDisplayElement.calcData = this.calcDisplayInput;
    this.getCalcDisplayData();
    this.clearCalcDisplayInput();
  }

  getCalcDisplayInput() {
    this.calcDisplayInput = this.calcDisplayElement.calcInput;
  }

  getCalcDisplayData() {
    this.calcDisplayData = this.calcDisplayElement.calcData;
  }

  // criar método que verifica se string tem 'e'
  // se tiver, desconstruir e converter em número normal
  convertScientificToNumber() {
    this.getCalcDisplayInput();
    console.log(this.calcDisplayInput);
    console.log(this.calcDisplayInput.includes('e'));
    // if (this.calcDisplayInput.includes('e')) {

    // }
    // const isScientificNotation
  }

  showAfterComma(number: number, afterComma: number) {
    return number.toFixed(afterComma);
  }

  showResult(result: string) {
    if (result.length > 13) {
      const resultExponential = this.changeDotToComma(this.expo(+result, 4)).toString();
      this.calcDisplayElement.calcInput = resultExponential;
    } else {
      this.calcDisplayElement.calcInput = this.changeDotToComma(result);
    }
  }

  expo(x: number, f: number) {
    return x.toExponential(f);
  }

  showOperationSymbol(clickType: string) {
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
    return operationString;
  }

  changeCommaToDot(enter: string) {
    return enter.replaceAll(',', '.');
  }

  changeDotToComma(enter: string) {
    return enter.replaceAll('.', ',');
  }

  onButtonClickBasicOperations(clickType: string) {
    const operationString = this.showOperationSymbol(clickType);
    this.getCalcDisplayInput();
    this.setCalcDisplayInput(operationString);
    this.transferToDisplayData();
    this.chaningOperations = true;
    this.wasResultShowed = false;
  }

  basicOperation() {
    this.setCalcDisplayData(this.calcDisplayInput);
    const calcDataText = this.calcDisplayData.split(' ');

    let result = 0;
    let count = 0;

    calcDataText.forEach(member => {
      const adjustedMember = +this.changeCommaToDot(member);
      if (count === 0) {
        result = adjustedMember;
      }
      if (!Number.isNaN(+member) && count !== 0) {
        if (this.operationType === 'add') {
          result = result + adjustedMember;
        }
        if (this.operationType === 'subtract') {
          result = result - adjustedMember;
        }
        if (this.operationType === 'multiply') {
          result = result * adjustedMember;
        }
        if (this.operationType === 'divide') {
          result = result / adjustedMember;
        }
      }
      count++;
    });
    this.showResult(result.toString());
    this.operationType = '';
    this.chaningOperations = false;
  }

  invert(n: number) {
    return 1 / n;
  }

  onButtonClickInvert() {
    const calcInputText = +this.changeCommaToDot(this.calcDisplayInput);
    const inverted = this.invert(calcInputText);
    const newInverted = this.showAfterComma(inverted, 4);
    this.showResult(this.changeDotToComma(newInverted.toString()));
  }

  exponentiation(n: number, x?: number) {
    if (x) {
      return Math.pow(n, x);
    }
    return Math.pow(n, 2);
  }

  onButtonClickExponentiation() {
    this.getCalcDisplayInput();
    this.setCalcDisplayInput('²');
    this.transferToDisplayData();
    const n = +this.calcDisplayData.substring(0, this.calcDisplayData.length - 1);
    this.exponentiation(n);
    this.showResult(this.exponentiation(n).toString());
    this.wasResultShowed = true;
  }

  // essa função pode ser usada para que o usuário diga o expoente da raíz (x)
  root(n: number, x?: number) {
    if (x) {
      return Math.pow(n, 1 / x);
    }
    return Math.pow(n, 1 / 2);
  }

  onButtonClickRoot() {
    this.getCalcDisplayInput();
    this.setCalcDisplayInputInFrontAndBack('√(', ')');
    this.transferToDisplayData();
    const n = +this.calcDisplayData.substring(2, this.calcDisplayData.length - 1);
    this.showResult(this.root(n).toString());
    this.wasResultShowed = true;
  }

  @Listen('buttonClick', { target: 'body' })
  onCalcButtonClick(event: CustomEvent) {
    for (let i = 0; i <= 9; i++) {
      if (event.detail === `number-${i}`) {
        if (this.wasResultShowed) {
          this.clearCalcDisplay();
          this.wasResultShowed = false;
        }
        this.setCalcDisplayInput(i.toString());
      }
    }
    if (event.detail === 'clear') {
      this.clearCalcDisplay();
    }
    if (event.detail === 'equal') {
      if (!this.wasResultShowed) {
        this.basicOperation();
        this.wasResultShowed = true;
      }
    }
    if (event.detail === 'add' || event.detail === 'subtract' || event.detail === 'multiply' || event.detail === 'divide') {
      if (!this.chaningOperations) {
        this.onButtonClickBasicOperations(event.detail);
      } else {
        this.basicOperation();
        this.onButtonClickBasicOperations(event.detail);
        this.clearCalcDisplayInput();
      }
    }
    if (event.detail === 'backspace') {
      if (!this.wasResultShowed) {
        const calcInputText = this.calcDisplayElement.calcInput;
        this.calcDisplayElement.calcInput = calcInputText.slice(0, -1);
      }
    }
    if (event.detail === 'invert') {
      this.onButtonClickInvert();
    }
    if (event.detail === 'sqrt') {
      this.onButtonClickRoot();
    }
    if (event.detail === 'square') {
      this.onButtonClickExponentiation();
    }
    if (event.detail === 'change') {
      this.getCalcDisplayInput();
      const calcDisplayInputChangedSignal = -+this.calcDisplayInput;
      this.calcDisplayElement.calcInput = calcDisplayInputChangedSignal.toString();
    }
    if (event.detail === 'dot') {
      if (this.calcDisplayInput === '' || this.wasResultShowed) {
        this.clearCalcDisplay();
        this.setCalcDisplayInput('0,');
        this.wasResultShowed = false;
      }
      if (this.calcDisplayInput.indexOf(',') > -1) {
        return;
      }
      this.setCalcDisplayInput(',');
    }
  }

  render() {
    const { responsiveSize } = this;

    return (
      <Host
        class={{
          'calc-component': true,
          'calc-component--responsive': responsiveSize,
        }}
      >
        <calc-button onClick={this.convertScientificToNumber.bind(this)}></calc-button>
        <calc-container class="calc-component__container" responsiveSize={responsiveSize}>
          <div class="calc-component__column">
            <calc-display calc-data="" calc-input=""></calc-display>
            <div class="calc-component__grid">
              <calc-button responsiveSize={responsiveSize} class="calc-component__button-big" button-type="clear" button-color="green"></calc-button>
              <calc-button responsiveSize={responsiveSize} class="calc-component__button-big" button-type="backspace"></calc-button>
              <calc-button responsiveSize={responsiveSize} button-type="invert"></calc-button>
              <calc-button responsiveSize={responsiveSize} button-type="square"></calc-button>
              <calc-button responsiveSize={responsiveSize} button-type="sqrt"></calc-button>
              <calc-button responsiveSize={responsiveSize} button-type="divide"></calc-button>
              <calc-button responsiveSize={responsiveSize} button-type="number-9"></calc-button>
              <calc-button responsiveSize={responsiveSize} button-type="number-8"></calc-button>
              <calc-button responsiveSize={responsiveSize} button-type="number-7"></calc-button>
              <calc-button responsiveSize={responsiveSize} button-type="multiply"></calc-button>
              <calc-button responsiveSize={responsiveSize} button-type="number-6"></calc-button>
              <calc-button responsiveSize={responsiveSize} button-type="number-4"></calc-button>
              <calc-button responsiveSize={responsiveSize} button-type="number-5"></calc-button>
              <calc-button responsiveSize={responsiveSize} button-type="subtract"></calc-button>
              <calc-button responsiveSize={responsiveSize} button-type="number-3"></calc-button>
              <calc-button responsiveSize={responsiveSize} button-type="number-2"></calc-button>
              <calc-button responsiveSize={responsiveSize} button-type="number-1"></calc-button>
              <calc-button responsiveSize={responsiveSize} button-type="add"></calc-button>
              <calc-button responsiveSize={responsiveSize} button-type="change"></calc-button>
              <calc-button responsiveSize={responsiveSize} button-type="number-0"></calc-button>
              <calc-button responsiveSize={responsiveSize} button-type="dot"></calc-button>
              <calc-button responsiveSize={responsiveSize} button-type="equal" button-color="red"></calc-button>
            </div>
          </div>
        </calc-container>
      </Host>
    );
  }
}
