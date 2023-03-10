import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'calc-container',
  styleUrl: 'calc-container.scss',
  shadow: true,
})
export class CalcContainer {
  render() {
    return (
      <Host class="calc-container">
        <slot></slot>
      </Host>
    );
  }
}
