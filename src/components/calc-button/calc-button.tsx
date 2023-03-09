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

    if (buttonType === EnumButtonType.NUMBER0) {
      text = <span class="calc-button__number"> 0 </span>;
    }
    if (buttonType === EnumButtonType.NUMBER1) {
      text = <span class="calc-button__number"> 1 </span>;
    }
    if (buttonType === EnumButtonType.NUMBER2) {
      text = <span class="calc-button__number"> 2 </span>;
    }
    if (buttonType === EnumButtonType.NUMBER3) {
      text = <span class="calc-button__number"> 3 </span>;
    }
    if (buttonType === EnumButtonType.NUMBER4) {
      text = <span class="calc-button__number"> 4 </span>;
    }
    if (buttonType === EnumButtonType.NUMBER5) {
      text = <span class="calc-button__number"> 5 </span>;
    }
    if (buttonType === EnumButtonType.NUMBER6) {
      text = <span class="calc-button__number"> 6 </span>;
    }
    if (buttonType === EnumButtonType.NUMBER7) {
      text = <span class="calc-button__number"> 7 </span>;
    }
    if (buttonType === EnumButtonType.NUMBER8) {
      text = <span class="calc-button__number"> 8 </span>;
    }
    if (buttonType === EnumButtonType.NUMBER9) {
      text = <span class="calc-button__number"> 9 </span>;
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

    return (
      <Host class="calc-button" onClick={onButtonClick.bind(this, buttonType)}>
        <button class="calc-button__content">{text}</button>
      </Host>
    );
  }
}
