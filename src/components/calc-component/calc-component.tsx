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

  convertScientificToNumber(stringOfANumber: string) {
    const isScientificNotation = stringOfANumber.includes('e');
    if (isScientificNotation) {
      const inputStringArray = stringOfANumber.split('e');
      const baseNumber = +this.changeCommaToDot(inputStringArray[0]);
      const expo = +inputStringArray[1];
      const result = baseNumber * this.exponentiation(10, expo);
      return result;
    } else {
      return +this.changeCommaToDot(stringOfANumber);
    }
  }

  // currently not in use
  showAfterComma(number: number, afterComma: number) {
    return number.toFixed(afterComma);
  }

  showResult(result: string) {
    if (result === 'NaN') {
      this.calcDisplayElement.calcInput = 'Error';
      return;
    }
    if (result.length > 13) {
      const treatedNumber = +this.changeCommaToDot(result);
      const expoNumber = this.expo(treatedNumber, 4);
      const expoNumberWithDot = this.changeDotToComma(expoNumber);
      this.calcDisplayElement.calcInput = expoNumberWithDot;
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
    this.getCalcDisplayInput();
    this.setCalcDisplayInputInFrontAndBack('1 / ', '');
    this.transferToDisplayData();
    const fraction = this.calcDisplayData.replaceAll(' ', '').split('/');
    const denominator = +this.changeCommaToDot(fraction[1]);
    const inverted = this.invert(denominator);
    const result = this.changeDotToComma(inverted.toString());
    this.showResult(result);
  }

  exponentiation(n: number, x?: number) {
    if (x) {
      return Math.pow(n, x);
    }
    return Math.pow(n, 2);
  }

  onButtonClickExponentiation() {
    this.getCalcDisplayInput();
    this.setCalcDisplayInputInFrontAndBack('(', ')²');
    this.transferToDisplayData();
    const numberInString = this.calcDisplayData.substring(1, this.calcDisplayData.length - 2);
    const number = this.convertScientificToNumber(numberInString);
    const result = this.exponentiation(number);
    this.showResult(result.toString());
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
    const numberInString = this.calcDisplayData.substring(2, this.calcDisplayData.length - 1);
    const number = this.convertScientificToNumber(numberInString);
    const result = this.root(number);
    this.showResult(result.toString());
    this.wasResultShowed = true;
  }

  executeBackspace() {
    if (!this.wasResultShowed) {
      const calcInputText = this.calcDisplayElement.calcInput;
      this.calcDisplayElement.calcInput = calcInputText.slice(0, -1);
    }
  }

  executeEqual() {
    if (!this.wasResultShowed) {
      this.basicOperation();
      this.wasResultShowed = true;
    }
  }

  executeNumber(emittedEvent: string) {
    for (let i = 0; i <= 9; i++) {
      if (emittedEvent === `number-${i}`) {
        if (this.wasResultShowed) {
          this.clearCalcDisplay();
          this.wasResultShowed = false;
        }
        this.setCalcDisplayInput(i.toString());
      }
    }
  }

  executeOperation(operation: string) {
    if (!this.chaningOperations) {
      this.onButtonClickBasicOperations(operation);
    } else {
      this.basicOperation();
      this.onButtonClickBasicOperations(operation);
      this.clearCalcDisplayInput();
    }
  }

  @Listen('keydown', { target: 'window' })
  onKeyPress(event: KeyboardEvent) {
    if (event.key === '=' || event.key === 'Enter') {
      this.executeEqual();
      console.log(`dentro: ${event.key}`);
      // = funciona, Enter não funciona
      // = funciona, Enter não funciona
      // = funciona, Enter não funciona
    }
    if (event.key === 'Backspace') {
      this.executeBackspace();
    }
    if (event.key === 'Escape') {
      this.clearCalcDisplay();
    }
    if (event.key === '+') {
      this.executeOperation('add');
    }
    if (event.key === '-') {
      this.executeOperation('subtract');
    }
    if (event.key === '*') {
      this.executeOperation('multiply');
    }
    if (event.key === '/') {
      this.executeOperation('divide');
    }
    if (!Number.isNaN(+event.key)) {
      // não funciona direito, as vezes falha!!!!!
      // não funciona direito, as vezes falha!!!!!
      // não funciona direito, as vezes falha!!!!!
      this.executeNumber(`number-${event.key}`);
      // não funciona direito, as vezes falha!!!!!
      // não funciona direito, as vezes falha!!!!!
      // não funciona direito, as vezes falha!!!!!
    }
  }

  @Listen('buttonClick', { target: 'body' })
  onCalcButtonClick(event: CustomEvent) {
    if (event.detail.startsWith('number-')) {
      this.executeNumber(event.detail);
    }
    if (event.detail === 'clear') {
      this.clearCalcDisplay();
    }
    if (event.detail === 'equal') {
      this.executeEqual();
    }
    if (event.detail === 'add' || event.detail === 'subtract' || event.detail === 'multiply' || event.detail === 'divide') {
      this.executeOperation(event.detail);
    }
    if (event.detail === 'backspace') {
      this.executeBackspace();
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
      const number = -this.convertScientificToNumber(this.calcDisplayInput);
      this.showResult(number.toString());
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
