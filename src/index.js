import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import nouislider from "nouislider";

import { isEqual } from "./utils";

const areEqual = (prevProps, nextProps) => {
  const { start, disabled, range } = prevProps;
  return (
    isEqual(nextProps.start, start) &&
    nextProps.disabled === disabled &&
    isEqual(nextProps.range, range)
  );
};

const Nouislider = props => {
  const [slider, setSlider] = useState(null);
  const sliderContainer = React.createRef();

  useEffect(() => {
    const { instanceRef } = props;
    const isCreatedRef =
      instanceRef &&
      Object.prototype.hasOwnProperty.call(instanceRef, "current");
    if (instanceRef && instanceRef instanceof Function) {
      instanceRef(sliderContainer.current);
    }

    if (isCreatedRef) {
      // eslint-disable-next-line no-param-reassign
      instanceRef.current = sliderContainer.current;
    }

    return () => {
      if (isCreatedRef) {
        // eslint-disable-next-line no-param-reassign
        instanceRef.current = null;
      }
    };
  }, [sliderContainer]);

  const clickOnPip = pip => {
    const value = Number(pip.target.getAttribute("data-value"));
    if (slider) {
      slider.set(value);
    }
  };

  const toggleDisable = disabled => {
    const sliderHTML = sliderContainer.current;
    if (sliderHTML) {
      if (!disabled) {
        sliderHTML.removeAttribute("disabled");
      } else {
        sliderHTML.setAttribute("disabled", true);
      }
    }
  };

  const updateRange = range => {
    const sliderHTML = sliderContainer.current;
    sliderHTML.noUiSlider.updateOptions({ range });
  };

  const createSlider = () => {
    const { onUpdate, onChange, onSlide, onStart, onEnd, onSet } = props;
    const sliderComponent = nouislider.create(sliderContainer.current, {
      ...props
    });

    if (onStart) {
      sliderComponent.on("start", onStart);
    }

    if (onSlide) {
      sliderComponent.on("slide", onSlide);
    }

    if (onUpdate) {
      sliderComponent.on("update", onUpdate);
    }

    if (onChange) {
      sliderComponent.on("change", onChange);
    }

    if (onSet) {
      sliderComponent.on("set", onSet);
    }

    if (onEnd) {
      sliderComponent.on("end", onEnd);
    }

    setSlider(sliderComponent);
  };

  useEffect(() => {
    const { disabled } = props;
    const sliderHTML = sliderContainer.current;
    if (sliderHTML) {
      toggleDisable(disabled);
      createSlider();
    }
  }, []);

  useEffect(() => {
    if (props.clickablePips) {
      const sliderHTML = sliderContainer.current;
      sliderHTML.querySelectorAll(".noUi-value").forEach(pip => {
        pip.style.cursor = "pointer";
        pip.addEventListener("click", clickOnPip);
      });
    }
    return () => {
      const sliderHTML = sliderContainer.current;
      if (slider) slider.destroy();
      if (sliderHTML) {
        sliderHTML.querySelectorAll(".noUi-value").forEach(pip => {
          pip.removeEventListener("click", clickOnPip);
        });
      }
    };
  }, [slider]);

  const { start, disabled, range } = props;

  useEffect(() => {
    if (slider) {
      updateRange(range);
      slider.set(start);
    }
    toggleDisable(disabled);
  }, [start, disabled, range]);

  const { id, className, style } = props;
  const options = {};
  if (id) {
    options.id = id;
  }
  if (className) {
    options.className = className;
  }
  return <div {...options} ref={sliderContainer} style={style} />;
};

Nouislider.propTypes = {
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
  format: PropTypes.object,
  keyboardSupport: PropTypes.bool,
  id: PropTypes.string,
  instanceRef: PropTypes.oneOf([PropTypes.func, PropTypes.object]),
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
  pips: PropTypes.object,
  // https://refreshless.com/nouislider/slider-values/#section-range
  range: PropTypes.object.isRequired,
  snap: PropTypes.bool,
  // https://refreshless.com/nouislider/slider-options/#section-start
  start: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
  ]).isRequired,
  // https://refreshless.com/nouislider/slider-options/#section-step
  step: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.string),
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
  animate: true,
  behaviour: "tap",
  className: null,
  clickablePips: false,
  connect: false,
  direction: "ltr",
  disabled: false,
  format: null,
  margin: null,
  limit: null,
  keyboardSupport: true,
  id: null,
  instanceRef: null,
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

export default React.memo(Nouislider, areEqual);
