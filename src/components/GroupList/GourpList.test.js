import React from 'react';
import { mount } from 'enzyme';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';

import GroupList from './GroupList';

describe('<GroupList/>', () => {
  afterEach(cleanup);

  const mockGroups = [
    {
      name: 'group1',
      _id: 'a',
    },
    {
      name: 'group2',
      _id: 'b',
    }
  ];

  const mockGroupItemOnClick = jest.fn();
  const mockGroupNameOnClick = jest.fn();
  const mockCheckBox = jest.fn();

  const wrapper = mount(
    <GroupList
      groups={mockGroups}
      onGroupItemClick={mockGroupItemOnClick}
      onGroupNameClick={mockGroupNameOnClick}
      handleCheckbox={mockCheckBox}
    />
  );

  it('should be render lists correctly', () => {
    expect(wrapper.containsMatchingElement(mockGroups[0].name)).toEqual(true);
    expect(wrapper.containsMatchingElement(mockGroups[1].name)).toEqual(true);
  });

  it('should be invoked when button is clicked', () => {
    render(
      <GroupList
        groups={mockGroups}
        onGroupItemClick={mockGroupItemOnClick}
        onGroupNameClick={mockGroupNameOnClick}
        handleCheckbox={mockCheckBox}
      />
    );

    fireEvent.click(screen.getByText(mockGroups[0].name));

    expect(mockGroupItemOnClick).toHaveBeenCalledTimes(1);
    expect(mockGroupNameOnClick).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
