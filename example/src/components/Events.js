import React from 'react';

const Events = () => (
  <section className="options">
    <h2>
      <a href="https://refreshless.com/nouislider/events-callbacks/">Events:</a>
    </h2>
    <ul>
      <li>
        <a href="https://refreshless.com/nouislider/events-callbacks/#section-update">
          onUpdate
        </a>{' '}
        - fires every time the slider values are changed, either by a user or by
        calling API methods.
      </li>
      <li>
        <a href="https://refreshless.com/nouislider/events-callbacks/#section-slide">
          onSlide
        </a>{' '}
        - fires on a change by a 'tap'.
      </li>
      <li>
        <a href="https://refreshless.com/nouislider/events-callbacks/#section-set">
          onSet
        </a>{' '}
        - will trigger every time a slider stops changing
      </li>
      <li>
        <a href="https://refreshless.com/nouislider/events-callbacks/#section-change">
          onChange
        </a>{' '}
        - fires when a user stops sliding, or when a slider value is changed by
        'tap'.
      </li>
      <li>
        <a href="https://refreshless.com/nouislider/events-callbacks/#section-start">
          onStart
        </a>{' '}
        - This event fires when a handle is clicked
      </li>
      <li>
        <a href="https://refreshless.com/nouislider/events-callbacks/#section-end">
          onEnd
        </a>{' '}
        - fires when a handle is released
      </li>
    </ul>
  </section>
);

export default Events;
