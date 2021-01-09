import React from 'react';
import { mount } from 'enzyme';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';

import MyVideo from './MyVideo';

describe('<MyVideo />', () => {
  afterEach(cleanup);

  const mockHandleVideoPlay = jest.fn();

  const wrapper = mount(
    <MyVideo
      isHost={true}
      onPlay={mockHandleVideoPlay}
      autioMuted='muted'
    />
  );

  it('should be invoked when video is played', () => {
    render(
      <MyVideo
        isHost={true}
        handleVideoPlay={mockHandleVideoPlay}
        audioMuted='muted'
      />
    );

    fireEvent.play(screen.getByTestId('video'));

    expect(mockHandleVideoPlay).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
