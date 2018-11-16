'use strict';

/* Import WebpackApp */
import '@polymer/iron-demo-helpers/demo-pages-shared-styles.js';
import '@polymer/iron-demo-helpers/demo-snippet.js';
import '@polymer/paper-styles/shadow.js';
import '@polymer/iron-form/iron-form.js';
import '../../datetime-input.js';
import '../../date-input.js';
import '../../time-input.js';

const $template = document.createElement('template');

$template.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style is="custom-style" include="demo-pages-shared-styles">
      time-input,
      date-input,
      datetime-input,
      input {
        margin-bottom: 4px;
        margin-left: 8px;
      }
      time-input,
      date-input,
      datetime-input {
        margin-bottom: 4px;
        margin-left: 8px;
        --input-color: #111;
        --input-background: #61d162;
        --input-focus-color: #000;
        --input-focus-background: #61d162;
        --input-invalid-border-color: #ff0000;
        --inner-input-focus-color: #000;
        --inner-input-focus-background: #eee;
        --inner-input-border-radius: 4px;
        --input-padding: 4px;
        --input-border-radius: 6px;
        --input-selection-color: #fff;
        --input-selection-background: #000;
        --input-transition: background-color 250ms ease-in-out, opacity 250ms ease-in-out;
        --input-placeholder-color: #000;
        --input-style: {
          opacity: 0.8;
        };
        --input-focus: {
          opacity: 1;
        };
        --input-invalid: {
          opacity: 1;
        };
      }
      iron-form {
        @apply --shadow-elevation-2dp;
        padding: 20px;
      }
      .output {
        color: #333;
        margin-top: 20px;
        padding: 6px;
        word-wrap: break-word;
        font-family: monospace;
        background: rgba(0, 0, 0, 0.05);
        border-color: #555;
        border-width: thin;
        border-style: dashed;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($template.content);
