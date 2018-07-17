import React from "react";
import PropTypes from "prop-types";

import nouislider from "nouislider";

class Nouislider extends React.Component {
  sliderContainer = React.createRef();

  componentDidMount() {
    const { accessibility, clickablePips, disabled } = this.props;
    const sliderHTML = this.sliderContainer.current;
    if (!disabled) {
      sliderHTML.removeAttribute("disabled");
    } else {
      sliderHTML.setAttribute("disabled", true);
    }
    this.createSlider();
    if (sliderHTML) {
      if (accessibility)
        sliderHTML
          .querySelector(".noUi-handle")
          .addEventListener("keydown", this.onKeyPressed);
      if (clickablePips)
        sliderHTML.querySelectorAll(".noUi-value").forEach(pip => {
          pip.style.cursor = "pointer";
          pip.addEventListener("click", this.clickOnPip);
        });
    }
  }

  componentDidUpdate(prevProps) {
    const { start } = this.props;
    if (start !== prevProps.start && this.slider) {
      this.slider.set(start);
    }
  }

  componentWillUnmount() {
    if (this.slider) this.slider.destroy();
    if (this.sliderContainer.current) {
      this.sliderContainer.current
        .querySelector(".noUi-handle")
        .removeEventListener("keydown", this.onKeyPressed);
      this.sliderContainer.current
        .querySelector(".noUi-value")
        .removeEventListener("click", this.clickOnPip);
    }
  }

  onKeyPressed = e => {
    const value = Number(this.slider.get());
    const { step } = this.props;
    if (e.which === 37) {
      this.slider.set(value - step);
    }

    if (e.which === 39) {
      this.slider.set(value + step);
    }
  };

  clickOnPip = pip => {
    const value = Number(pip.target.getAttribute("data-value"));
    this.slider.set(value);
  };

  createSlider() {
    const { onUpdate, onChange, onSlide, onStart, onEnd, onSet } = this.props;
    const slider = nouislider.create(this.sliderContainer.current, {
      ...this.props
    });

    this.slider = slider;

    if (onStart) {
      slider.on("start", onStart);
    }

    if (onSlide) {
      slider.on("slide", onSlide);
    }

    if (onUpdate) {
      slider.on("update", onUpdate);
    }

    if (onChange) {
      slider.on("change", onChange);
    }

    if (onSet) {
      slider.on("set", onSet);
    }

    if (onEnd) {
      slider.on("end", onEnd);
    }
  }

  render() {
    const { id, className, style } = this.props;
    const options = {};
    if (id) {
      options.id = id;
    }
    if (className) {
      options.className = className;
    }
    return <div {...options} ref={this.sliderContainer} style={style} />;
  }
}

Nouislider.propTypes = {
  accessibility: PropTypes.bool,
  // https://refreshless.com/nouislider/slider-options/#section-animate
  animate: PropTypes.bool,
  // https://refreshless.com/nouislider/behaviour-option/
  behaviour: PropTypes.string,
  className: PropTypes.string,
  clickablePips: PropTypes.bool,
  // https://refreshless.com/nouislider/slider-options/#section-connect
  connect: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.bool),
    PropTypes.bool
  ]),
  // http://refreshless.com/nouislider/slider-options/#section-orientation
  direction: PropTypes.oneOf(["ltr", "rtl"]),
  // https://refreshless.com/nouislider/more/#section-disable
  disabled: PropTypes.bool,
  id: PropTypes.string,
  // https://refreshless.com/nouislider/slider-options/#section-limit
  limit: PropTypes.number,
  // https://refreshless.com/nouislider/slider-options/#section-margin
  margin: PropTypes.number,
  // https://refreshless.com/nouislider/events-callbacks/#section-change
  onChange: PropTypes.func,
  // https://refreshless.com/nouislider/events-callbacks/
  onEnd: PropTypes.func,
  // https://refreshless.com/nouislider/events-callbacks/#section-set
  onSet: PropTypes.func,
  // http://refreshless.com/nouislider/events-callbacks/#section-slide
  onSlide: PropTypes.func,
  // http://refreshless.com/nouislider/events-callbacks/
  onStart: PropTypes.func,
  // http://refreshless.com/nouislider/events-callbacks/#section-update
  onUpdate: PropTypes.func,
  // https://refreshless.com/nouislider/slider-options/#section-orientation
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  // https://refreshless.com/nouislider/slider-options/#section-padding
  padding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  // https://refreshless.com/nouislider/pips/
  pips: PropTypes.shape,
  // https://refreshless.com/nouislider/slider-values/#section-range
  range: PropTypes.shape.isRequired,
  snap: PropTypes.bool,
  // https://refreshless.com/nouislider/slider-options/#section-start
  start: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
  ]).isRequired,
  // https://refreshless.com/nouislider/slider-options/#section-step
  step: PropTypes.number,
  style: PropTypes.shape,
  // https://refreshless.com/nouislider/slider-options/#section-tooltips
  tooltips: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(
      PropTypes.shape({
        to: PropTypes.func
      })
    )
  ])
};

Nouislider.defaultProps = {
  accessibility: false,
  animate: true,
  behaviour: "tap",
  className: "",
  clickablePips: false,
  connect: false,
  direction: "ltr",
  disabled: false,
  margin: null,
  limit: null,
  id: "",
  padding: 0,
  pips: null,
  snap: false,
  step: null,
  style: null,
  orientation: "horizontal",
  tooltips: false,
  onChange: () => {},
  onEnd: () => {},
  onSet: () => {},
  onSlide: () => {},
  onStart: () => {},
  onUpdate: () => {}
};

export default Nouislider;
