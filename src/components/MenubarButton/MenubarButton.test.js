import React from 'react';
import { mount } from 'enzyme';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';

import MenubarButton from './MenubarButton';

import { MENU_MODE } from '../../constants/index';

describe('<MenubarButton />', () => {
  afterEach(cleanup);

  const {
    OUT,
    INVITE,
    STUDENTS,
    PUBLIC_CHAT,
    SCREEN_SHARE,
    QUESTION_CHAT } = MENU_MODE;
  const mockOnClick = jest.fn();
  const wrapper = mount(<MenubarButton handleClick={mockOnClick} />);

  it('should be invoked when button is clicked', () => {
    render(<MenubarButton handleClick={mockOnClick} />);

    fireEvent.click(screen.getByText(OUT));
    fireEvent.click(screen.getByText(INVITE));
    fireEvent.click(screen.getByText(STUDENTS));
    fireEvent.click(screen.getByText(PUBLIC_CHAT));
    fireEvent.click(screen.getByText(SCREEN_SHARE));
    fireEvent.click(screen.getByText(QUESTION_CHAT));

    expect(mockOnClick).toHaveBeenCalledTimes(6);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
