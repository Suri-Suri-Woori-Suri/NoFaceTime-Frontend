import React from 'react';
import { mount } from 'enzyme';
import { cleanup, render, screen } from '@testing-library/react';

import Logo from './Logo';

describe('<Logo />', () => {
  afterEach(cleanup);

  const wrapper = mount(<Logo />);

  it('should be contain Logo gif', () => {
    render(<Logo />);

    expect(screen.getByAltText('Two Face Time gif')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
