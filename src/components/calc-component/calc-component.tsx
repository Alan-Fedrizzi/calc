import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'calc-component',
  styleUrl: 'calc-component.scss',
  shadow: true,
})
export class CalcComponent {
  render() {
    return (
      <Host class="calc-component">
        <slot></slot>
      </Host>
    );
  }
}
