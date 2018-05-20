import React from 'react';
import Nouislider from 'react-nouislider';

const Slider = () => (
  <div className="slider">
    <Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} connect />
  </div>
);

export default Slider;
