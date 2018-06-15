/* global document */
import React from 'react';
import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';

import './examples.css';
import './colorpicker.css';
import './toggle.css';

const COLORS = ['red', 'green', 'blue'];
const colors = [0, 0, 0];

class Examples extends React.Component {
  state = {
    value: 10,
    color: 'rgb(127, 127, 127)',
    textValue: null,
    percent: null,
  };

  componentDidMount() {
    this.slider.current &&
      this.slider.current.sliderContainer.current
        .querySelector('.noUi-handle')
        .addEventListener('keydown', this.onKeyPressed);
  }

  componentWillUnmount() {
    this.slider.current.sliderContainer.current
      .querySelector('.noUi-handle')
      .removeEventListener('keydown', this.onKeyPressed);
  }

  onKeyPressed = e => {
    const { value } = this.state;
    if (e.which === 37) {
      this.setState({ value: value - 10 });
      this.slider.current.slider.set(value - 10);
    }

    if (e.which === 39) {
      this.setState({ value: value + 10 });
      this.slider.current.slider.set(value + 10);
    }
  };

  onUpdate = index => (render, handle, value, un, percent) => {
    colors[index] = value[0];
    this.setState({ color: `rgb(${colors.join(',')})` });
  };

  onSlide = (render, handle, value, un, percent) => {
    this.setState({
      textValue: value[0].toFixed(2),
      percent: percent[0].toFixed(2),
    });
  };

  onSkipSlide = (render, handle, value, un, percent) => {
    this.setState({
      skippingValue: value[0],
    });
  };

  slider = React.createRef();

  render() {
    const { color, textValue, percent, skippingValue } = this.state;
    return (
      <section className="options">
        <h2>
          <a href="https://refreshless.com/nouislider/examples/">Examples:</a>
        </h2>
        <div className="examples">
          <h4>Colorpicker:</h4>
          <div className="slider" id="colorpicker">
            {COLORS.map((item, index) => (
              <Nouislider
                key={item}
                id={item}
                start={127}
                connect={[true, false]}
                orientation="vertical"
                range={{
                  min: 0,
                  max: 255,
                }}
                onUpdate={this.onUpdate(index)}
              />
            ))}
            <div id="result" style={{ background: color, color }} />
          </div>
        </div>
        <div className="examples">
          <h4>Adding keyboard support:</h4>
          <div className="warning">UNSTABLE! 'React' solution is in work!</div>
          <Nouislider
            start={10}
            step={10}
            range={{
              min: 0,
              max: 100,
            }}
            ref={this.slider}
          />
        </div>
        <div className="examples">
          <h4>Non linear slider:</h4>
          <Nouislider
            connect
            start={[500, 4000]}
            behaviour="tap"
            range={{
              min: [0],
              '10%': [500, 500],
              '50%': [4000, 1000],
              max: [10000],
            }}
            onSlide={this.onSlide}
          />
          {textValue &&
            percent && (
              <div>
                Value: {textValue}, {percent} %
              </div>
            )}
        </div>
        <div className="examples">
          <h4>Pips:</h4>
          <Nouislider
            start={[50]}
            pips={{ mode: 'count', values: 5 }}
            range={{
              min: 0,
              max: 100,
            }}
          />
        </div>
        <div className="examples">
          <h4>Skipping steps:</h4>
          <Nouislider
            start={20}
            snap
            range={{
              min: 0,
              '10%': 10,
              '20%': 20,
              '30%': 30,
              '50%': 50,
              '60%': 60,
              '70%': 70,
              '90%': 90,
              max: 100,
            }}
            onSlide={this.onSkipSlide}
          />
          {!!skippingValue && <div>Value: {skippingValue}</div>}
        </div>
        <div className="examples">
          <h4>Creating a toggle:</h4>
          <Nouislider
            id="slider-toggle"
            orientation="vertical"
            start={0}
            range={{
              min: [0, 1],
              max: 1,
            }}
          />
        </div>
      </section>
    );
  }
}

export default Examples;
