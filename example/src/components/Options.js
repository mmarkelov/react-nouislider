import React from 'react';

const Options = () => (
  <section className="options">
      <h2><a href='https://refreshless.com/nouislider/slider-options/'>Options:</a></h2>
    <ul>
      <li>
        START - <b>Accepted values</b> : string, array[string], array[string,
        string, ...]
      </li>
      <li>
        CONNECT - <b>Accepted values</b> : true, false, array[...]
      </li>
      <li>
        MARGIN - <b>Accepted values</b> : number
      </li>
      <li>
        LIMIT - <b>Accepted values</b> : number
      </li>
      <li>
        PADDING - <b>Accepted values</b> : number, array[number], array[number,
        number, ...]
      </li>
      <li>
        STEP - <b>Accepted values</b> : number
      </li>
      <li>
        ORIENTATION - <b>Accepted values</b> : vertical, horizontal
      </li>
      <li>
        DIRECTION - <b>Accepted values</b> : ltr, rtl
      </li>
      <li>
        TOOLTIPS - <b>Accepted values</b> : false, true, formatter,
        array[formatter or true or false, ...]
      </li>
      <li>
        ANIMATE - <b>Accepted values</b> : true, false
      </li>
    </ul>
  </section>
);

export default Options;
