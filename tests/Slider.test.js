import React from 'react';
import { mount } from 'enzyme';
import Nouislider from '../src';

describe('Provider', () => {
  test('mounted correctly', () => {
    const wrapper = mount(
      <Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} connect />,
    );

    expect(wrapper.render().hasClass('noUi-target')).toEqual(true);
  });
});
