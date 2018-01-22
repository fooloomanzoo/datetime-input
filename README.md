[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/fooloomanzoo/datetime-input)
[![API](https://img.shields.io/badge/API-available-green.svg)](https://www.webcomponents.org/element/fooloomanzoo/datetime-input/elements/datetime-input)
[![Demo](https://img.shields.io/badge/demo-available-red.svg)](https://www.webcomponents.org/element/fooloomanzoo/datetime-input/demo/demo/index.html)

_[API](https://fooloomanzoo.github.io/datetime-input/components/datetime-input/#/elements/datetime-input)_ and
_[Demo](https://fooloomanzoo.github.io/datetime-input/components/datetime-input/#/elements/datetime-input/demos/demo/index.html)_

## \<datetime-input\>

An input for date and time.

If you are looking for a picker for date and time, please have a look at [datetime-picker](https://github.com/fooloomanzoo/datetime-picker).

### Example

<!--
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="datetime-input.html">

    <dom-bind>
      <template is="dom-bind">
        <custom-style>
          <style is="custom-style">
            html {
              font-family: 'Roboto', 'Noto', 'Source Sans Pro', sans-serif;
            }
          </style>
        </custom-style>

        <next-code-block></next-code-block>
      </template>
    </dom-bind>
  </template>
</custom-element-demo>
```
-->
```html
  <input type="checkbox" checked="{{withTimezone::change}}">with timezone<br><br>
  <datetime-input value="{{value}}" datetime="{{datetime}}" date="{{date}}" time="{{time}}" with-timezone="{{withTimezone}}"></datetime-input><br>
  <date-input date="{{date}}" with-timezone="{{withTimezone}}"></date-input><br>
  <time-input time="{{time}}" with-timezone="{{withTimezone}}"></time-input>
  <p>
    <code>datetime:</code>&#32;<b>[[datetime]]</b><br>
    <code>value:</code>&#32;<b>[[value]]</b>
  </p>
```

### Installation
```
bower install --save fooloomanzoo/datetime-input
```

### License
[MIT](https://github.com/fooloomanzoo/datetime-input/blob/master/LICENSE.txt)
