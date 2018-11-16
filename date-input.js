import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { FormElementMixin } from '@fooloomanzoo/input-picker-pattern/form-element-mixin.js';
import { DatetimeMixin, maxDayOfMonth } from '@fooloomanzoo/property-mixins/datetime-mixin.js';
import { DatetimeInputMixin, DatetimeFormMixin } from './datetime-input-mixin.js';
import '@fooloomanzoo/number-input/integer-input.js';

/**
 *
 * Mixin to extend an element to a date input
 *
 * @mixinFunction
 * @polymer
 **/
export const DateInputPattern = dedupingMixin( superClass => {

  return class extends superClass {

    static get inputTemplate() {
      return html`
        <div class="date part" style$="order:[[_computePartOrder(dateOrder.dateFirst)]];" tabindex>
          <integer-input id="year" value-as-number="{{year}}" pad-length="4" placeholder="−−−−" disabled="[[_partsDisabled.year]]" start-at="[[_getDefaultForProp('year')]]"></integer-input>
          <span id="dateSeparator1">[[dateSeparator]]</span>
          <integer-input id="month" value-as-number="{{month}}" min="0" max="13" pad-length="2" placeholder="−−" disabled="[[_partsDisabled.month]]" start-at="[[_getDefaultForProp('month')]]"></integer-input>
          <span id="dateSeparator2">[[dateSeparator]]</span>
          <integer-input id="day" max="[[_computeMaxForDayInput(year, month)]]" value-as-number="{{day}}" min="0" no-clamp pad-length="2" placeholder="−−" step="[[_partsStep.day]]" disabled="[[_partsDisabled.day]]" start-at="1"></integer-input>
        </div>
        ${super.inputTemplate || html``}
      `;
    }

    static get properties() {
      return {
        /**
         * Clamp timetime to a property
         * possible values: 'month', 'day', 'hour', 'minute', 'second', 'millisecond' or ''
         */
        clamp: {
          type: String,
          value: 'hour',
          notify: true
        },

        /**
         * if true perspective starts at 0 (1970-01-01)
         */
        _timeOnly: {
          type: Boolean,
          value: false
        }
      }
    }

    static get observers() {
      return [
        '_orderDateParts(dateOrder, clamp)'
      ]
    }

    _orderDateParts(order, clamp) {
      if (order === undefined) {
        return;
      }
      // set hidden attributes
      let hidden = this._ifClamped(clamp, order.parts[0]),
        totalhidden = 0;
      // if first date part is clamped, hide the first date sperator and the first date part
      if (hidden) {
        this.$[order.parts[0]].setAttribute('hidden', '');
        this.$.dateSeparator1.setAttribute('hidden', '');
        totalhidden++;
      } else {
        this.$[order.parts[0]].removeAttribute('hidden');
        this.$.dateSeparator1.removeAttribute('hidden');
      }

      hidden = this._ifClamped(clamp, order.parts[1]);
      // if middle date part is clamped, hide the middle date part
      if (hidden) {
        this.$[order.parts[1]].setAttribute('hidden', '');
        totalhidden++;
      } else {
        this.$[order.parts[1]].removeAttribute('hidden');
      }

      hidden = this._ifClamped(clamp, order.parts[2]);
      // if last date part is clamped, hide the last date sperator the last date part
      if (hidden) {
        this.$[order.parts[2]].setAttribute('hidden', '');
        this.$.dateSeparator2.setAttribute('hidden', '');
        totalhidden++;
      } else {
        this.$[order.parts[2]].removeAttribute('hidden');
        this.$.dateSeparator2.removeAttribute('hidden');
      }

      // if more than one date part is clamped, hide all the date sperators
      if (totalhidden > 1) {
        this.$.dateSeparator1.setAttribute('hidden', '');
        this.$.dateSeparator2.setAttribute('hidden', '');
      }

      // reorder parts
      const datePartNode = this.shadowRoot.querySelector('.date.part');

      datePartNode.appendChild(this.$[order.parts[0]]);
      datePartNode.appendChild(this.$.dateSeparator1);
      datePartNode.appendChild(this.$[order.parts[1]]);
      datePartNode.appendChild(this.$.dateSeparator2);
      datePartNode.appendChild(this.$[order.parts[2]]);

      if (this.$[order.parts[2]].hasAttribute('hidden')) {
        this.$.dateSeparator2.setAttribute('hidden', '');
      }
    }

    _getDefaultForProp(prop) {
      const d = (this._defaultValue && new Date(this._defaultValue)) || new Date();
      switch (prop) {
        case 'year':
          return d.getFullYear();
        case 'month':
          return d.getMonth() + 1;
        default:
          return 0;
      }
    }

    _computeMaxForDayInput(year, month) {
      if (year === undefined || month === undefined) {
        return;
      }
      return maxDayOfMonth(year, month) + 1;
    }
  }
});
/**
 *  `<date-input>` is an input for time for **[Polymer](https://github.com/Polymer/polymer)**
 *
 *  ```html
 *    <date-input value="{{value}}"></date-input>
 *  ```
 *
 *  Have a look at [input-picker-pattern#input-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-shared-style) to see the used style-properties.
 *
 *  @polymer
 *  @customElement
 *
 *  @appliesMixin DateInputPattern
 *  @appliesMixin DatetimeInputMixin
 *  @appliesMixin FormElementMixin
 *  @appliesMixin DatetimeMixin
 *
 * @demo demo/index.html
 * @demo demo/form.html In a form
 **/
export class DateInput extends DateInputPattern(DatetimeInputMixin(DatetimeFormMixin(FormElementMixin(DatetimeMixin(PolymerElement))))) {

  static get is() {
    return 'date-input';
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

if (!customElements.get(DateInput.is)) {
  customElements.define(DateInput.is, DateInput);
}
