import React from 'react';
import { mount } from 'enzyme';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';

import MyRoom from './MyRoom';

describe('<MyRoom/>', () => {
  afterEach(cleanup);

  const mockCurrentUser = [
    {
      name: 'group1',
      _id: 'a',
    },
    {
      name: 'group2',
      _id: 'b',
    }
  ];
  const mockEnterRoom = jest.fn();
  const mockPopupModal = jest.fn();
  const mockCheckBox = jest.fn();

  const wrapper = mount(
    <MyRoom
      currentUser={mockCurrentUser}
      enterRoom={mockEnterRoom}
      popupModal={mockPopupModal}
      handleCheckbox={mockCheckBox}
    />
  );

  it('should be render add room button correctly', () => {
    expect(wrapper.containsMatchingElement('Add Room')).toEqual(true);
  });

  it('should be invoked when button is clicked', () => {
    render(
      <MyRoom
        currentUser={mockCurrentUser}
        enterRoom={mockEnterRoom}
        popupModal={mockPopupModal}
        handleCheckbox={mockCheckBox}
      />
    );

    fireEvent.click(screen.getByText('Add Room'));

    expect(mockPopupModal).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
