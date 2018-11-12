import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { FormElementMixin } from '@fooloomanzoo/input-picker-pattern/form-element-mixin.js';
import { DatetimeMixin } from '@fooloomanzoo/property-mixins/datetime-mixin.js';
import { DatetimeInputMixin, DatetimeFormMixin } from './datetime-input-mixin.js';
import { DateInputPattern } from './date-input.js';
import { TimeInputPattern } from './time-input.js';

/**
 *  `<datetime-input>` is an input for datetime for **[Polymer](https://github.com/Polymer/polymer)**
 *
 *  ```html
 *    <datetime-input value="{{value}}"></datetime-input>
 *  ```
 *
 *  Have a look at [input-picker-pattern#input-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-shared-style) to see the used style-properties.
 *
 *  @polymer
 *  @customElement
 *
 *  @appliesMixin DateInputPattern
 *  @appliesMixin TimeInputPattern
 *  @appliesMixin DatetimeInputMixin
 *  @appliesMixin FormElementMixin
 *  @appliesMixin DatetimeMixin
 *
 *  @demo demo/index.html
 *  @demo demo/form.html In a form
 **/
export class DatetimeInput extends DateInputPattern(TimeInputPattern(DatetimeInputMixin(DatetimeFormMixin(FormElementMixin(DatetimeMixin(PolymerElement)))))) {

  static get is() {
    return 'datetime-input';
  }

  static get template() {
    return html`
      ${this.styleTemplate}
      <div id="input">
        ${this.inputTemplate}
      </div>
    `
  }

  static get properties() {
    return {
      /**
       * Clamp timetime to a property
       * possible values: 'month', 'day', 'hour', 'minute', 'second', 'millisecond' or ''
       */
      clamp: {
        type: String,
        value: 'millisecond',
        notify: true
      }
    }
  }
}

if (!customElements.get(DatetimeInput.is)) {
  customElements.define(DatetimeInput.is, DatetimeInput);
}
