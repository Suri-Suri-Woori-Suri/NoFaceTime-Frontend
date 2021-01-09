import React from 'react';
import { mount } from 'enzyme';
import { cleanup, render, screen } from '@testing-library/react';

import Login from './Login';

describe('<Login />', () => {
  const mockUpdateUserData = jest.fn();
  const wrapper = mount(<Login updateUserData={mockUpdateUserData} />);

  beforeEach(() => {
    render(<Login updateUserData={mockUpdateUserData} />);
  });

  afterEach(cleanup);

  it(`should be contain 'Login' text`, () => {
    expect(screen.getByText('Login')).toBeInTheDocument(true);
  });

  it(`should be contain 'Login' button`, () => {
    expect(screen.getByText('Google Login')).toBeInTheDocument(true);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
