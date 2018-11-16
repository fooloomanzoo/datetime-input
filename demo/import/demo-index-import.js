'use strict';

/* Import WebpackApp */

import '@polymer/iron-demo-helpers/demo-pages-shared-styles.js';
import '@polymer/iron-demo-helpers/demo-snippet.js';
import '@fooloomanzoo/number-input/number-input.js';
import '../../datetime-input.js';
import '../../date-input.js';
import '../../time-input.js';
import '@polymer/iron-demo-helpers/demo-pages-shared-styles.js';

const $template = document.createElement('template');

$template.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style is="custom-style" include="demo-pages-shared-styles">
      .result {
        margin: 0.5em 0;
      }
      .step {
        --input-background: rgba(0,0,0,0.1);
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($template.content);
