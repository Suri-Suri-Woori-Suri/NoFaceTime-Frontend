import React from 'react';
import { cleanup } from '@testing-library/react';

import { mountWithRouter, renderWithRouter } from '../../setupTests';
import Home from './Home';

describe('<Home />', () => {
  afterEach(cleanup);

  const wrapper = mountWithRouter(<Home />);

  it('renders text properly in main page', () => {
    const { getByText } = renderWithRouter(<Home />);

    expect(getByText('Are you there?')).toBeInTheDocument();
  });

  it(`render img properly to have altervative text as 'notebook'`, () => {
    const { getByAltText } = renderWithRouter(<Home />);

    expect(getByAltText('notebook')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
