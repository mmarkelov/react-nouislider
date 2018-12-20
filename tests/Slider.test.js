/* eslint-env jest */

import React from 'react';
import { mount } from 'enzyme';
import Nouislider from '../src';

describe('Provider', () => {
  test('mounted correctly', () => {
    const wrapper = mount(
      <Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} connect />,
    );

    expect(wrapper.render().hasClass('noUi-target')).toBe(true);
  });

  test('should apply id option and pass it to div', () => {
    const wrapper = mount(
      <Nouislider
        id="test"
        range={{ min: 0, max: 100 }}
        start={[20, 80]}
        connect
      />,
    );
    expect(wrapper.html().includes('id="test"')).toBe(true);
  });

  test('should apply className option and pass it to div', () => {
    const wrapper = mount(
      <Nouislider
        className="test"
        range={{ min: 0, max: 100 }}
        start={[20, 80]}
        connect
      />,
    );
    expect(wrapper.render().hasClass('test')).toBe(true);
  });

  test('should add cursor style if clickablePips props was passed', () => {
    const wrapper = mount(
      <Nouislider
        start={[50]}
        pips={{ mode: 'count', values: 5 }}
        clickablePips
        range={{
          min: 0,
          max: 100,
        }}
      />,
    );
    expect(
      wrapper
        .render()
        .html()
        .includes('cursor: pointer'),
    ).toBe(true);
  });

  test('shouldComponentUpdate return right result', () => {
    const wrapper = mount(
      <Nouislider
        className="test"
        range={{ min: 0, max: 100 }}
        start={[20, 80]}
        connect
      />,
    );
    const shouldUpdate = wrapper
      .instance()
      .shouldComponentUpdate({ start: [20, 20] });
    expect(shouldUpdate).toBe(true);
  });

  test('componentWillUnmount', () => {
    const wrapper = mount(
      <Nouislider
        className="test"
        range={{ min: 0, max: 100 }}
        start={[20, 80]}
        connect
      />,
    );

    const componentWillUnmount = jest.spyOn(wrapper.instance(), 'componentWillUnmount');
    wrapper.unmount();
    expect(componentWillUnmount.mock.calls.length).toBe(1);
  });
});
