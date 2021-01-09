import React from 'react';
import { mount } from 'enzyme';

import ButtonInHeader from './ButtonInHeader';

describe('<ButtonInHeader />', () => {
  const mockFn = jest.fn();

  const wrapperLogin = mount(
    <ButtonInHeader
      isLoggedIn={false}
      updateUserData={mockFn} />
  );

  const wrapperLogout = mount(
    <ButtonInHeader
      isLoggedIn={true}
      updateUserData={mockFn} />
  );

  it('should be contain login button', () => {
    const loginButton = wrapperLogin.findWhere(node =>
      node.type() === 'button');

    expect(loginButton.text()).toBe('Sign In');
  });

  it('should be contain logout button', () => {
    const logoutButton = wrapperLogout.findWhere(node =>
      node.type() === 'button');

    expect(logoutButton.text()).toBe('Sign Out');
  });


  it('matches snapshot', () => {
    expect(wrapperLogin).toMatchSnapshot();
    expect(wrapperLogout).toMatchSnapshot();
  });
});
