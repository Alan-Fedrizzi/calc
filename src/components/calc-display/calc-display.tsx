import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'calc-display',
  styleUrl: 'calc-display.scss',
  shadow: true,
})
export class CalcDisplay {
  @Prop({ reflect: true }) calcData: string;
  @Prop({ reflect: true }) calcInput: string;

  render() {
    const { calcData, calcInput } = this;

    return (
      <Host class="calc-display">
        <p class="calc-display__data"> {calcData} </p>
        <p class="calc-display__input"> {calcInput} </p>
      </Host>
    );
  }
}
