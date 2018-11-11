import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html, htmlLiteral } from '@polymer/polymer/lib/utils/html-tag.js';
import { FormElementMixin } from '@fooloomanzoo/input-picker-pattern/form-element-mixin.js';
import { DatetimeMixin } from '@fooloomanzoo/property-mixins/datetime-mixin.js';
import { DatetimeFormMixin, DatetimeInputMixin } from '../../datetime-input-mixin.js';

class BasicDatetimeInputElement extends DatetimeInputMixin(DatetimeFormMixin(FormElementMixin(DatetimeMixin(PolymerElement)))) {
  static get is() {
    return 'basic-datetime-input-element';
  }
  static get template() {
    return html`
      ${this.styleTemplate}
      <div id="input">
        ${this.inputTemplate}
      </div>
    `
  }
}
customElements.define(BasicDatetimeInputElement.is, BasicDatetimeInputElement);
