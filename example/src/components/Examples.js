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
    color: 'rgb(127, 127, 127)',
    textValue: null,
    percent: null,
    value: 0,
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

  handleClick = () => {
    this.setState(prevState => ({ value: prevState.value + 10 }));
  };

  render() {
    const { color, textValue, percent, skippingValue, value } = this.state;
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
          <Nouislider
            accessibility
            start={10}
            step={10}
            range={{
              min: 0,
              max: 100,
            }}
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
          <h4>Clickable pips:</h4>
          <Nouislider
            start={[50]}
            pips={{ mode: 'count', values: 5 }}
            clickablePips
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
        <div className="examples">
          <h4>Change start by changing state:</h4>
          <button onClick={this.handleClick}>Change state</button>
          <Nouislider
            setStart={value}
            start={0}
            range={{
              min: 0,
              max: 100,
            }}
          />
        </div>
      </section>
    );
  }
}

export default Examples;
