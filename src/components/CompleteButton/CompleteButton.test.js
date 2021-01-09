import React from 'react';
import { mount } from 'enzyme';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';

import CompleteButton from './CompleteButton';

describe('<CompleteButton />', () => {
  afterEach(cleanup);

  const mockButtonName = '완료';
  const mockOnClick = jest.fn();

  const wrapper = mount(
    <CompleteButton
      buttonName={mockButtonName}
      onClick={mockOnClick} />
  );

  it('should be contain button', () => {
    const button = wrapper.findWhere(node =>
      node.type() === 'button');

    expect(button.text()).toBe(mockButtonName);
  });

  it('should be render button name correctly', () => {
    expect(wrapper.containsMatchingElement(mockButtonName)).toEqual(true);
  });

  it('should be invoked when button is clicked', () => {
    render(
      <CompleteButton
        buttonName={mockButtonName}
        onClick={mockOnClick} />
    );

    fireEvent.click(screen.getByText(mockButtonName));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
