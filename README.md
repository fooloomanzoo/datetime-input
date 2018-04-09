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
  <datetime-input value="{{value}}" datetime="{{datetime}}" date="{{date}}" time="{{time}}" with-timezone="{{withTimezone}}" timezone="{{timezone}}"></datetime-input><br><br>
  <date-input date="{{date}}" timezone="[[timezone]]"></date-input><br><br>
  <time-input time="{{time}}" timezone="[[timezone]]" default="0" with-timezone="{{withTimezone}}"></time-input>
  <p>
    <code>datetime:</code>&#32;<b>[[datetime]]</b><br>
    <code>date:</code>&#32;<b>[[date]]</b><br>
    <code>time:</code>&#32;<b>[[time]]</b><br>
    <code>value:</code>&#32;<b>[[value]]</b>
  </p>
```

#### Use locale date formats
The properties `date`, `time`, `datetime` are always in **iso8061** but the visualization will be localized. By default your locale date format from `window.navigator.language` will be used, but you can select another *locale*:

<!--
```
<custom-element-demo height="300">
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link rel="import" href="datetime-input.html">
    <style>
      html {
        font-family: 'Roboto', sans-serif;
      }
    </style>
    <dom-bind>
      <template is="dom-bind">
        <next-code-block></next-code-block>
      </template>
    </dom-bind>
  </template>
</custom-element-demo>
```
-->

```html
<p>
  locale:
  <select value="{{locale::change}}">
    <option value=""></option>
    <option value="en">english</option>
    <option value="fr">français</option>
    <option value="de">deutsch</option>
    <option value="es">español</option>
    <option value="it">italiano</option>
    <option value="ru">русский</option>
    <option value="ja">日本語</option>
    <option value="zh">中文</option>
  </select>
  <br><br>
  <input type="checkbox" checked="{{hour12::change}}">hour12 format
</p>

<p>
  <datetime-input locale="{{locale}}" datetime="{{datetime}}" hour12="[[hour12]]"></datetime-input>
</p>

<p>datetime: [[datetime]]</p>
```

### Styling
Have a look at [input-picker-pattern#input-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-shared-style) to see how to style the element.

### Installation
```
bower install --save fooloomanzoo/datetime-input
```
or
```
npm install --save @fooloomanzoo/datetime-input
```

### Update
to last version
```
bower update -f
```


### License
[MIT](https://github.com/fooloomanzoo/datetime-input/blob/master/LICENSE.txt)
