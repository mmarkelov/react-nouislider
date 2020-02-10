/* eslint-env jest */

import React from 'react';
import { mount } from 'enzyme';
import Nouislider from '../src';

describe('Slider', () => {
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
    expect(wrapper.hasClass('test')).toBe(true);
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
    expect(wrapper.html().includes('cursor: pointer')).toBe(true);
  });

  test('disabled prop should passed correctly', () => {
    const wrapper = mount(
      <Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} disabled />,
    );
    expect(wrapper.prop('disabled')).toBe(true);
  });

  test('unmount correctly', () => {
    const wrapper = mount(
      <Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} disabled />,
    );
    wrapper.unmount();
    const wrapper2 = mount(
      <Nouislider range={{ min: 0, max: 10 }} start={5} id="unmount" />,
    );
    expect(wrapper2.html().includes('id="unmount"')).toBe(true);
  });

  describe('areEqual', () => {
    test('return right result for start', () => {
      const wrapper = mount(
        <Nouislider
          className="test"
          range={{ min: 0, max: 100 }}
          start={20}
          connect
        />,
      );
      wrapper.setProps({ start: 80 });
      expect(wrapper.html().includes('aria-valuenow="80.0"')).toBe(true);
    });

    test('return right result for disabled', () => {
      const wrapper = mount(
        <Nouislider
          className="test"
          range={{ min: 0, max: 100 }}
          start={20}
          connect
          disabled={false}
        />,
      );
      wrapper.setProps({ disabled: true });
      expect(wrapper.prop('disabled')).toBe(true);
    });

    test('return right result for range', () => {
      const wrapper = mount(
        <Nouislider
          className="test"
          range={{ min: 0, max: 50 }}
          start={20}
          connect
          disabled={false}
        />,
      );
      wrapper.setProps({ range: { min: 0, max: 100 } });
      expect(wrapper.html().includes('aria-valuemax="100.0"')).toBe(true);
    });

    test('return right result for step', () => {
      const wrapper = mount(
          <Nouislider
              className="test"
              start={0}
              range={{ min: 0, max: 50 }}
              step={1}
              connect
              disabled={false}
          />,
      );
      wrapper.setProps({ step: 5 });
      expect(wrapper.prop('step')).toBe(5);
    });
  });

  describe('instanceRef', () => {
    test('functional instanceRef', () => {
      const refFunc = jest.fn();
      mount(
        <Nouislider
          instanceRef={instance => refFunc(instance)}
          start={0}
          range={{
            min: 0,
            max: 50,
          }}
        />,
      );
      expect(refFunc).toHaveBeenCalled();
    });

    test('instanceRef with React.createRef', () => {
      const ref = React.createRef();
      const wrapper = mount(
        <Nouislider
          instanceRef={ref}
          start={0}
          range={{
            min: 0,
            max: 50,
          }}
        />,
      );

      expect(wrapper.find('div').instance()).toEqual(ref.current);
    });

    test('instanceRef with React.createRef is null after unmount', () => {
      const ref = React.createRef();
      const wrapper = mount(
        <Nouislider
          instanceRef={ref}
          start={0}
          range={{
            min: 0,
            max: 50,
          }}
        />,
      );
      wrapper.unmount();

      expect(ref.current).toBe(null);
    });
  });
});
