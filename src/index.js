import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import nouislider from "nouislider";

import { isEqual } from "./utils";

const areEqual = (prevProps, nextProps) => {
  const { start, step, disabled, range } = prevProps;
  return (
    nextProps.step === step &&
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

  const { onUpdate, onChange, onSlide, onStart, onEnd, onSet } = props;

  const updateEvents = (sliderComponent) => {
    if (onStart) {
      sliderComponent.off("start");
      sliderComponent.on("start", onStart);
    }

    if (onSlide) {
      sliderComponent.off("slide");
      sliderComponent.on("slide", onSlide);
    }

    if (onUpdate) {
      sliderComponent.off("update");
      sliderComponent.on("update", onUpdate);
    }

    if (onChange) {
      sliderComponent.off("change");
      sliderComponent.on("change", onChange);
    }

    if (onSet) {
      sliderComponent.off("set");
      sliderComponent.on("set", onSet);
    }

    if (onEnd) {
      sliderComponent.off("end");
      sliderComponent.on("end", onEnd);
    }
  }

  const updateOptions = options => {
    const sliderHTML = sliderContainer.current;
    sliderHTML.noUiSlider.updateOptions(options);
  };

  const setClickableListeners = () => {
    if (props.clickablePips) {
      const sliderHTML = sliderContainer.current;
      [...sliderHTML.querySelectorAll(".noUi-value")].forEach(pip => {
        pip.style.cursor = "pointer";
        pip.addEventListener("click", clickOnPip);
      });
    }
  };

  const createSlider = () => {
    const sliderComponent = nouislider.create(sliderContainer.current, {
      ...props
    });

    updateEvents(sliderComponent);

    setSlider(sliderComponent);
  };

  useEffect(() => {
    const { disabled } = props;
    const sliderHTML = sliderContainer.current;
    if (sliderHTML) {
      toggleDisable(disabled);
      createSlider();
    }
    return () => {
      if (slider) slider.destroy();
      if (sliderHTML) {
        [...sliderHTML.querySelectorAll(".noUi-value")].forEach(pip => {
          pip.removeEventListener("click", clickOnPip);
        });
      }
    };
  }, []);

  useEffect(() => {
    if (slider) {
      setClickableListeners()
    }
  }, [slider]);

  const { start, disabled, range, step } = props;

  useEffect(() => {
    if (slider) {
      updateOptions({range, step});
      slider.set(start);
      setClickableListeners()
    }
    toggleDisable(disabled);
  }, [start, disabled, range, step]);

  useEffect(() => {
    if (slider) {
      updateEvents(slider)
    }
  }, [onUpdate, onChange, onSlide, onStart, onEnd, onSet])

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
      PropTypes.bool,
      PropTypes.shape({
        from: PropTypes.func,
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
