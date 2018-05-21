**This project is created as react-nouislider package is not well maintained.
 Also you can have a look at other natives react sliders: https://www.google.com/search?q=react+slider**

# nouislider-react

Wraps [leongersen/noUiSlider](https://github.com/leongersen/noUiSlider) in a [react component](https://facebook.github.io/react/docs/component-api.html).

## New features

There are no added features in nouislider-react compared to the underlying noUiSlider project.

## Documentation

All the options used in nouislider-react are then passed to noUiSlider. See the [noUiSlider documentation](http://refreshless.com/nouislider/) before opening issues.

## Usage

```sh
npm install nouislider-react
```

or

```sh
yarn add nouislider-react
```

```js
import React from 'react';
import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';

const Slider = () => (
   <Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} connect />
);
```