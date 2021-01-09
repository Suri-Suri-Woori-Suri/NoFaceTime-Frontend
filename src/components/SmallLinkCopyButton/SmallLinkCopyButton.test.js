import React from 'react';
import { mount } from 'enzyme';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';

import SmallLinkCopyButton from './SmallLinkCopyButton';

describe('<SmallLinkCopyButton/>', () => {
  afterEach(cleanup);

  const mockButtonName = 'properly render';
  const mockLink = 'https://www.twofacetim.xyz';
  const mockClickEventFunction = jest.fn();

  const wrapper = mount(
    <SmallLinkCopyButton
      buttonName={mockButtonName}
      link={mockLink}
      clickEventFunction={mockClickEventFunction} />
  );

  it('should be render button name correctly', () => {
    expect(wrapper.containsMatchingElement(mockButtonName)).toEqual(true);
  });

  it('should be invoked when button is clicked', () => {
    render(
      <SmallLinkCopyButton
        buttonName={mockButtonName}
        link={mockLink}
        clickEventFunction={mockClickEventFunction} />
    );

    fireEvent.click(screen.getByText(mockButtonName));
    expect(mockClickEventFunction).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
