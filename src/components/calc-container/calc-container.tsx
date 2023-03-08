import { Component, Host, h, Listen } from '@stencil/core';

@Component({
  tag: 'calc-container',
  styleUrl: 'calc-container.scss',
  shadow: true,
})
export class CalcContainer {
  @Listen('buttonClick', { target: 'body' })
  onCalcButtonClick(event: CustomEvent) {
    console.log(event);
  }

  render() {
    return (
      <Host class="calc-container">
        <slot></slot>
      </Host>
    );
  }
}
