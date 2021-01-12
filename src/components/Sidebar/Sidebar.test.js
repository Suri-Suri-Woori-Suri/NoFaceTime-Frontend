import React from 'react';
import { cleanup } from '@testing-library/react';

import Sidebar from './Sidebar';
import { mountWithRouter, renderWithRouter } from '../../setupTests';

describe('<Sidebar/>', () => {
  afterEach(cleanup);

  const wrapper = mountWithRouter(<Sidebar />);

  it('should be render lists correctly', () => {
    const { getByText } = renderWithRouter(<Sidebar />);

    expect(getByText('Room')).toBeInTheDocument(true);
    expect(getByText('Group')).toBeInTheDocument(true);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
