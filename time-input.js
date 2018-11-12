import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { FormElementMixin } from '@fooloomanzoo/input-picker-pattern/form-element-mixin.js';
import { DatetimeMixin } from '@fooloomanzoo/property-mixins/datetime-mixin.js';
import { DatetimeInputMixin, DatetimeFormMixin } from './datetime-input-mixin.js';
import '@fooloomanzoo/number-input/integer-input.js';

/**
 *
 * Mixin to extend an element to a time input
 *
 * @mixinFunction
 * @polymer
 **/
export const TimeInputPattern = dedupingMixin( superClass => {

  return class extends superClass {

    static get inputTemplate() {
      return html`
        <div class="time part" style$="order:[[_computePartOrder(dateOrder.timeFirst)]];" hidden$="[[_ifClamped(clamp, 'hour')]]">
          <integer-input hidden$="[[hour12Format]]" pad-length="2" min="-1" max="24" no-clamp value-as-number="{{hour}}" placeholder="00" disabled$="[[_partsDisabled.hour]]" step="[[_partsStep.hour]]"></integer-input>
          <template is="dom-if" if="[[hour12Format]]">
            <integer-input pad-length="2" no-clamp value-as-number="{{hour12}}" placeholder="00" min="0" max="13" disabled$="[[_partsDisabled.hour]]" step="[[_partsStep.hour]]"></integer-input>
          </template>
            <span hidden$="[[_ifClamped(clamp, 'minute')]]">[[timeSeparator]]</span>
          <integer-input hidden$="[[_ifClamped(clamp, 'minute')]]" value-as-number="{{minute}}" min="-1" max="60" pad-length="2" no-clamp step="[[_partsStep.minute]]" disabled="[[_partsDisabled.minute]]" placeholder="00"></integer-input>
            <span hidden$="[[_ifClamped(clamp, 'second')]]">[[timeSeparator]]</span>
          <integer-input hidden$="[[_ifClamped(clamp, 'second')]]" pad-length="2" min="-1" max="60" no-clamp step="[[_partsStep.second]]" disabled="[[_partsDisabled.second]]" value-as-number="{{second}}" placeholder="00"></integer-input>
            <span hidden$="[[_ifClamped(clamp, 'millisecond')]]">[[decimalSeparator]]</span>
          <integer-input hidden$="[[_ifClamped(clamp, 'millisecond')]]" value-as-number="{{millisecond}}" min="0" max="999" pad-length="3" no-clamp step="[[_partsStep.millisecond]]" disabled="[[_partsDisabled.millisecond]]" placeholder="000"></integer-input>
          <template is="dom-if" if="[[hour12Format]]">
            <button class="hour12" on-click="_switchAm" hidden$="[[!valueIsSet]]">
              <div hidden$="[[!isAm]]">[[amString]]</div>
              <div hidden$="[[isAm]]">[[pmString]]</div>
            </button>
          </template>
        </div>
        ${super.inputTemplate || html``}
      `;
    }

    static get styleTemplate() {
      return html`
        ${super.styleTemplate || html``}
        <style>
          #input .hour12 {
            font-size: 0.85em;
            margin: 0 0.15em;
            padding: 0.1em;
            align-self: stretch;
            border-color: transparent;
          }
        </style>
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
          value: '',
          notify: true
        },

        /**
         * if true perspective starts at 0 (1970-01-01)
         */
        _timeOnly: {
          type: Boolean,
          value: true
        }
      }
    }

    _switchAm() {
      this.isAm = !this.isAm;
    }
  }
});

/**
 *  `<time-input>` is an input for time for **[Polymer](https://github.com/Polymer/polymer)**
 *
 *  ```html
 *    <time-input value-as-number="{{value}}"></time-input>
 *  ```
 *
 *  Have a look at [input-picker-pattern#input-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-shared-style) to see the used style-properties.
 *
 *  @polymer
 *  @customElement
 *
 *  @appliesMixin TimeInputPattern
 *  @appliesMixin DatetimeInputMixin
 *  @appliesMixin FormElementMixin
 *  @appliesMixin DatetimeMixin
 *
 * @demo demo/index.html
 * @demo demo/form.html In a form
 **/
export class TimeInput extends TimeInputPattern(DatetimeInputMixin(DatetimeFormMixin(FormElementMixin(DatetimeMixin(PolymerElement))))) {

  static get is() {
    return 'time-input';
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

if (!customElements.get(TimeInput.is)) {
  customElements.define(TimeInput.is, TimeInput);
}
