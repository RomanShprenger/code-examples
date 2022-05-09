import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './Button';

Enzyme.configure({
  adapter: new Adapter(),
});

describe('Test: prop actions', () => {
  it('Should button be clicked', () => {
    const onButtonClick = jest.fn();

    const button = shallow(<Button
      onClick={onButtonClick}
    />);

    button.props().onClick();
    expect(onButtonClick.mock.calls.length).toBe(1);
  });

  it('Should button be on mouse up', () => {
    const onMouseUp = jest.fn();

    const button = shallow(<Button
      onMouseUp={onMouseUp}
    />);

    button.props().onMouseUp();
    expect(onMouseUp.mock.calls.length).toBe(1);
  });

  it('Should button be on mouse down', () => {
    const onMouseDown = jest.fn();

    const button = shallow(<Button
      onMouseDown={onMouseDown}
    />);

    button.props().onMouseDown();
    expect(onMouseDown.mock.calls.length).toBe(1);
  });

  it('Should button be on mouse leave', () => {
    const onMouseLeave = jest.fn();

    const button = shallow(<Button
      onMouseLeave={onMouseLeave}
    />);

    button.props().onMouseLeave();
    expect(onMouseLeave.mock.calls.length).toBe(1);
  });

  it('Should button be on mouse enter', () => {
    const onMouseEnter = jest.fn();

    const button = shallow(<Button
      onMouseEnter={onMouseEnter}
    />);

    button.props().onMouseEnter();
    expect(onMouseEnter.mock.calls.length).toBe(1);
  });

  it('Should button be blurred', () => {
    const onBlur = jest.fn();

    const button = shallow(<Button
      onBlur={onBlur}
    />);

    button.props().onBlur();
    expect(onBlur.mock.calls.length).toBe(1);
  });

  it('Should button be focused', () => {
    const onFocus = jest.fn();

    const button = shallow(<Button
      onFocus={onFocus}
    />);

    button.props().onFocus();
    expect(onFocus.mock.calls.length).toBe(1);
  });
});

describe('Test: proper classes added', () => {
  it('Should button have custom class', () => {
    const button = shallow(<Button
      className="customClass"
    />);

    expect(button.hasClass('customClass')).toBe(true);
  });
});
