import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { EnumButtonColor, EnumButtonType } from '../../utils/utils';

@Component({
  tag: 'calc-button',
  styleUrl: 'calc-button.scss',
  shadow: true,
})
export class CalcButton {
  @Prop({ reflect: true }) buttonType: EnumButtonType;
  @Prop({ reflect: true }) buttonColor?: EnumButtonColor;

  @Event({ bubbles: true, composed: true }) buttonClick: EventEmitter<string>;

  onButtonClick(type: string) {
    this.buttonClick.emit(type);
  }

  render() {
    const { buttonType, onButtonClick } = this;

    let text: string;

    for (let i = 0; i <= 9; i++) {
      if (buttonType === `number-${i}`) {
        text = <span class="calc-button__number"> {i} </span>;
      }
    }
    if (buttonType === EnumButtonType.CLEAR) {
      text = <span class="calc-button__number"> C </span>;
    }
    if (buttonType === EnumButtonType.ADD) {
      text = <span>+</span>;
    }
    if (buttonType === EnumButtonType.SUBTRACT) {
      text = <span class="calc-button__span">–</span>;
    }
    if (buttonType === EnumButtonType.MULTIPLY) {
      text = <span>×</span>;
    }
    if (buttonType === EnumButtonType.DIVIDE) {
      text = <span>÷</span>;
    }
    if (buttonType === EnumButtonType.EQUAL) {
      text = <span>=</span>;
    }
    if (buttonType === EnumButtonType.BACKSPACE) {
      text = <span class="calc-button__number">???</span>;
    }
    if (buttonType === EnumButtonType.SQRT) {
      text = <span class="calc-button__number">√x</span>;
    }
    if (buttonType === EnumButtonType.SQUARE) {
      text = <span class="calc-button__number">x²</span>;
    }
    if (buttonType === EnumButtonType.DOT) {
      text = <span class="calc-button__number">,</span>;
    }

    return (
      <Host class="calc-button" onClick={onButtonClick.bind(this, buttonType)}>
        <button class="calc-button__content">{text}</button>
      </Host>
    );
  }
}
