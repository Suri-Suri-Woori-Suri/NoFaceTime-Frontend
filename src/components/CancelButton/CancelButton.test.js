import React from 'react';
import { mount } from 'enzyme';

import CancelButton from './CancelButton';

describe('<CancelButton/>', () => {
  const mockButtonName = '취소';
  const mockOnClick = jest.fn();

  const wrapper = mount(
    <CancelButton
      buttonName={mockButtonName}
      onClick={mockOnClick} />
  );

  it('should be contain button', () => {
    const button = wrapper.findWhere(node =>
      node.type() === 'button');

    expect(button.text()).toBe(mockButtonName);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
