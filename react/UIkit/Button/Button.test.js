import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Button from './Button';

Enzyme.configure({
  adapter: new Adapter(),
});

describe('Test: render of different variants of button', () => {
  it('Should render Button with default settings correctly', () => {
    const tree = renderer
      .create(<Button />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render primary Button correctly', () => {
    const tree = renderer
      .create(<Button kind="primary" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render secondary Button correctly', () => {
    const tree = renderer
      .create(<Button kind="secondary" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render outline Button correctly', () => {
    const tree = renderer
      .create(<Button kind="outline" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render inside Button correctly', () => {
    const tree = renderer
      .create(<Button kind="inside" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render inverse Button correctly', () => {
    const tree = renderer
      .create(<Button kind="inverse" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render small Button correctly', () => {
    const tree = renderer
      .create(<Button size="s" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render medium Button correctly', () => {
    const tree = renderer
      .create(<Button size="m" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render large Button correctly', () => {
    const tree = renderer
      .create(<Button size="l" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render icon Button correctly', () => {
    const tree = renderer
      .create(<Button format="icon" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render file Button correctly', () => {
    const tree = renderer
      .create(<Button format="file" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render button type Button correctly', () => {
    const tree = renderer
      .create(<Button type="button" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render submit Button correctly', () => {
    const tree = renderer
      .create(<Button type="submit" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render reset Button correctly', () => {
    const tree = renderer
      .create(<Button type="reset" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render disabled Button correctly', () => {
    const tree = renderer
      .create(<Button disabled />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render focused Button correctly', () => {
    const tree = renderer
      .create(<Button focused />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render focused and disabled Button correctly', () => {
    const tree = renderer
      .create(<Button focused />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render Button with class prefix correctly', () => {
    const tree = renderer
      .create(<Button classNamePrefix="test" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('Test: markup of default button after user actions', () => {
  it('Should render Button after hover correctly', () => {
    const wrapper = mount(<Button />);
    wrapper.find('button').simulate('mouseenter');
    expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();
  });

  it('Should render Button after click correctly', () => {
    const wrapper = mount(<Button />);
    wrapper.find('button').simulate('mousedown');
    expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();
  });

  it('Should render Button after focus correctly', () => {
    const wrapper = mount(<Button />);
    wrapper.find('button').simulate('focus');
    expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();
  });

  it('Should render Button after focus and hover correctly', () => {
    const wrapper = mount(<Button />);
    wrapper.find('button').simulate('focus');
    wrapper.find('button').simulate('mouseenter');
    expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();
  });
});

describe('Test: markup of disabled button after user actions', () => {
  it('Should render Button after hover correctly', () => {
    const wrapper = mount(<Button disabled />);
    wrapper.find('button').simulate('mouseenter');
    expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();
  });

  it('Should render Button after click correctly', () => {
    const wrapper = mount(<Button disabled />);
    wrapper.find('button').simulate('mousedown');
    expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();
  });

  it('Should render Button after focus correctly', () => {
    const wrapper = mount(<Button disabled />);
    wrapper.find('button').simulate('focus');
    expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();
  });

  it('Should render Button after focus and hover correctly', () => {
    const wrapper = mount(<Button disabled />);
    wrapper.find('button').simulate('focus');
    wrapper.find('button').simulate('mouseenter');
    expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();
  });
});

describe('Test: markup of focused button after user actions', () => {
  it('Should render Button after hover correctly', () => {
    const wrapper = mount(<Button focused />);
    wrapper.find('button').simulate('mouseenter');
    expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();
  });

  it('Should render Button after click correctly', () => {
    const wrapper = mount(<Button focused />);
    wrapper.find('button').simulate('mousedown');
    expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();
  });

  it('Should render Button after focus correctly', () => {
    const wrapper = mount(<Button focused />);
    wrapper.find('button').simulate('focus');
    expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();
  });

  it('Should render Button after focus and hover correctly', () => {
    const wrapper = mount(<Button focused />);
    wrapper.find('button').simulate('focus');
    wrapper.find('button').simulate('mouseenter');
    expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();
  });
});
