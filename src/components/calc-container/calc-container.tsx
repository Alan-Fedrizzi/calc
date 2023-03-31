import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'calc-container',
  styleUrl: 'calc-container.scss',
  shadow: true,
})
export class CalcContainer {
  @Prop({ reflect: true, mutable: true }) responsiveSize = false;

  render() {
    const { responsiveSize } = this;

    return (
      <Host
        class={{
          'calc-container': true,
          'calc-container--responsive': responsiveSize,
        }}
      >
        <slot></slot>
      </Host>
    );
  }
}
