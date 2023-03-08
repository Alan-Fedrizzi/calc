import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'calc-display',
  styleUrl: 'calc-display.scss',
  shadow: true,
})
export class CalcDisplay {
  render() {
    return (
      <Host class="calc-display">
        <slot></slot>
      </Host>
    );
  }
}
