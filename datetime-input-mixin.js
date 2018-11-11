import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { fromDatetime } from '@fooloomanzoo/property-mixins/datetime-mixin.js';
import { style as inputStyle } from '@fooloomanzoo/input-picker-pattern/input-shared-style.js';
import '@fooloomanzoo/number-input/integer-input.js';

/**
 * Mixin to extend an element for combining form-element-mixin and datetime-mixin
 *
 * @mixinFunction
 * @polymer
 *
 */
export const DatetimeFormMixin = dedupingMixin( superClass => {

  return class extends superClass {

    constructor() {
      super();
      this._isSet = function(value) {
        return !(typeof value === 'boolean') && this._defaultIsSet(value);
      }.bind(this);
    }

    static get properties() {
      return {
        /**
         * If set the step defines the step a date should be incremented (in seconds). The input for the most inferior standing that would create an integer step is used to increment the value.
         * For example, if the **step** is:
         *  + **0.05**: the millisecond-input will increment the value by 50 (50 milliseconds), the other inputs behaive as expected
         *  + **1.05**: the millisecond-input will increment the value by 1050 (1 second and 50 millisecond), the other inputs behaive as expected
         *  + **2**: the millisecond-input will be disabled, the second-input will increment the value by 2000 (2 seconds), the other inputs behaive as expected
         *  + **180**: the millisecond-input and the second-input will be disabled, the minute-input will increment the value by 180000 (3 minutes), the other inputs behaive as expected
         * If `step="0"` all inputs will be disabled, else if the step is below _0.001_ the step will be set to **0.001**. The most supirior input that will become the given step is the day-input.
         */
        step: {
          type: Number,
          notify: true
        },

        /**
         * date-parts that are disabled
         */
        _partsDisabled: {
          type: Object,
          notify: true,
          value: function() {
            return {}
          }
        },

        /**
         * the computed steps for the date-parts
         */
        _partsStep: {
          type: Object,
          notify: true,
          readOnly: true,
          value: function() {
            return {
              day: 1,
              hour: 1,
              minute: 1,
              second: 1,
              millisecond: 1
            }
          }
        },
        /**
         * defines the property that should be used for the value
         */
        propertyForValue: {
          type: String,
          value: 'valueAsNumber'
        },

        /**
         * value of the default property
         */
        _defaultValue: {
          type: Number,
          computed: '_computeDefaultValue(default)'
        }
      }
    }

    static get observers() {
      return [
        '_computePartsStep(step)',
        '_computePartsDisabled(_partsStep.*, disabled)',
        '_defaultValueChanged(_defaultValue)'
      ]
    }

    _computeDefaultValue(def) {
      return +fromDatetime(def).valueAsDate;
    }

    _defaultChanged(def) {
      if (this._isSet(def) === false) {
        this.default = undefined;
      }
    }

    _defaultValueChanged(def) {
      if (isNaN(def)) {
        return;
      }
      if (isNaN(this.valueAsDate) || isNaN(this.valueAsNumber)) {
        this.reset();
      }
    }

    /**
     *  Sets value to the actual date
     **/
    now() {
      let d = new Date();
      if (!this.timezone) {
        if (this._timeOnly && !this.date) {
          this.__updatingTimezoneOffset = true;
          this.offsetMinutes = 0;
          this.__updatingTimezoneOffset = false;
          d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
          d.setUTCFullYear(1970);
          d.setUTCMonth(0);
          d.setUTCDate(1);
        } else {
          this._checkDefaultTimezone(d);
        }
      }
      // shift to UTC
      d.setMinutes(d.getMinutes() - this.offsetMinutes);
      if (this._partsDisabled) {
        // clamp date if one part is disabled (INFO: behaviour defined in datetime-input/datetime-input-mixin)
        if (this._partsDisabled.month) {
          d = this._clampUTC(d, 'month');
        } else if (this._partsDisabled.day) {
          d = this._clampUTC(d, 'day');
        } else if (this._partsDisabled.hour) {
          d = this._clampUTC(d, 'hour');
        } else if (this._partsDisabled.minute) {
          d = this._clampUTC(d, 'minute');
        } else if (this._partsDisabled.second) {
          d = this._clampUTC(d, 'second');
        } else if (this._partsDisabled.millisecond) {
          d = this._clampUTC(d, 'millisecond');
        }
      }
      // shift back
      d.setMinutes(d.getMinutes() + this.offsetMinutes);
      this.setDate(d);
    }

    /**
     * compute the steps for the related inputs. The day-input is the highest modified input allthough if the step is higher than a day in seconds it might also change month- or year-inputs.
     */
    _computePartsStep(step) {
      if (step === undefined) return;

      if (step === 0) {
        this.set('_partsStep.day', 0);
        this.set('_partsStep.hour', 0);
        this.set('_partsStep.minute', 0);
        this.set('_partsStep.second', 0);
        this.set('_partsStep.millisecond', 0);
        this.notifyPath('_partsStep');
        return;
      } else if (step < 0.001) {
        this.set('step', 0.001);
        this.set('_partsStep.day', 1);
        this.set('_partsStep.hour', 1);
        this.set('_partsStep.minute', 1);
        this.set('_partsStep.second', 1);
        this.set('_partsStep.millisecond', 1);
        this.notifyPath('_partsStep');
        if (this._ifClamped(this.clamp, 'millisecond')) {
          // reset `clamp` to next inferior standing if clamped
          this.set('clamp', '');
        }
        return;
      }
      step = +step.toFixed(3);

      if (step % 86400 === 0) {
        // step is multiple of a day
        this.set('_partsStep.day', step / 86400);
        this.set('_partsStep.hour', 0);
        this.set('_partsStep.minute', 0);
        this.set('_partsStep.second', 0);
        this.set('_partsStep.millisecond', 0);
        if (this._ifClamped(this.clamp, 'day')) {
          // reset `clamp` to next inferior standing if clamped
          this.set('clamp', 'hour');
        }
      } else if (step % 3600 === 0) {
        // step is multiple of an hour
        this.set('_partsStep.day', 1);
        this.set('_partsStep.hour', step / 3600);
        this.set('_partsStep.minute', 0);
        this.set('_partsStep.second', 0);
        this.set('_partsStep.millisecond', 0);
        if (this._ifClamped(this.clamp, 'hour')) {
          // reset `clamp` to next inferior standing if clamped
          this.set('clamp', 'minute');
        }
      } else if (step % 60 === 0) {
        // step is multiple of a minute
        this.set('_partsStep.day', 1);
        this.set('_partsStep.hour', 1);
        this.set('_partsStep.minute', step / 60);
        this.set('_partsStep.second', 0);
        this.set('_partsStep.millisecond', 0);
        if (this._ifClamped(this.clamp, 'minute')) {
          // reset `clamp` to next inferior standing if clamped
          this.set('clamp', 'second');
        }
      } else if (step % 1 === 0) {
        // step is multiple of a second
        this.set('_partsStep.day', 1);
        this.set('_partsStep.hour', 1);
        this.set('_partsStep.minute', 1);
        this.set('_partsStep.second', step);
        this.set('_partsStep.millisecond', 0);
        if (this._ifClamped(this.clamp, 'second')) {
          // reset `clamp` to next inferior standing if clamped
          this.set('clamp', 'millisecond');
        }
      } else {
        this.set('_partsStep.day', 1);
        this.set('_partsStep.hour', 1);
        this.set('_partsStep.minute', 1);
        this.set('_partsStep.second', 1);
        this.set('_partsStep.millisecond', step * 1000);
        if (this._ifClamped(this.clamp, 'millisecond')) {
          // reset `clamp` to next inferior standing if clamped
          this.set('clamp', '');
        }
      }
      this.notifyPath('_partsStep');
    }

    _computePartsDisabled(change, disabled) {
      if (!(change && change.path)) {
        return;
      }
      if (change.path.indexOf('.') !== -1) {
        const key = '_partsDisabled.' + change.path.split('.')[1];
        if (disabled) {
          this.set(key, true);
        } else {
          this.set(key, !change.value);
        }
      } else if (change && change.value) {
        for (let key in change.value) {
          this.set('_partsDisabled.' + key, disabled || !change.value[key]);
        }
      }
      this.notifyPath('_partsDisabled');
    }

    /**
     * reset the value and date properties
     */
    reset(e) {
      this.resetDate(e);
    }
  }
});

/**
 * Mixin to extend an element for an datetime input element
 *
 * @mixinFunction
 * @polymer
 *
 * @param {Object} superClass class to extend
 * @return {Object} extended class
 */
export const DatetimeInputMixin = dedupingMixin( superClass => {

  return class extends superClass {

    static get styleTemplate() {
      return html`
        ${super.styleTemplate || html``}
        ${inputStyle}
        <style>
          #input > .part,
          .timezone {
            display: inline-flex;
            flex-flow: row nowrap;
            align-items: baseline;
          }
          #input > div {
            padding: var(--input-field-padding, 0 1px);
            border: var(--input-border-width, thin) solid transparent;
          }
          #input .reset {
            order: 2;
          }
          #input integer-input[always-sign] {
            --input-align: end;
          }
        </style>
      `;
    }

    /**
     * template for the input parts
     */
    static get inputTemplate() {
      return html`
        ${this.timezoneInputTemplate}
        <button class="icon reset" invisible$="[[_resetButtonIsInvisible]]" hidden$="[[disabled]]" on-click="resetDate">
          <svg viewBox="0 0 24 24"><g><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></g></svg>
        </button>
        ${super.inputTemplate || html``}
      `
    }

    /**
     * template for the input parts
     */
    static get timezoneInputTemplate() {
      return html`
        <template is="dom-if" if="[[withTimezone]]">
          <div class="timezone" style$="order:[[_computePartOrder(dateOrder.timeFirst)]];">
            <integer-input value="{{_timeZoneHours}}" pad-length="2" always-sign step="1" placeholder="±00" min="-23" max="23" use-negative-zero></integer-input>
            <span>[[timeSeparator]]</span>
            <integer-input value="{{_timeZoneMinutes}}" pad-length="2" min="0" max="45" step="15" placeholder="00"></integer-input>
          </div>
        </template>
      `
    }

    static get properties() {
      return {
        /**
         * if true, the reset button is hidden
         */
        hideResetButton: {
          type: Boolean,
          reflectToAttribute: true
        },

        /**
         * if true, timezone inputs are shown
         */
        withTimezone: {
          type: Boolean,
          value: false
        },

        _resetButtonIsInvisible: {
          type: Boolean,
          computed: '_computeResetButtonIsInvisible(valueIsSet, _defaultValue, valueAsNumber)'
        }
      }
    }

    _computePartOrder(first) {
      return first ? 0 : 1;
    }

    _computeResetButtonIsInvisible(valueIsSet, defaultValue, valueAsNumber) {
      return !valueIsSet || (!isNaN(defaultValue) && defaultValue === valueAsNumber) || this._isSet(valueAsNumber) === false;
    }
  }
});
