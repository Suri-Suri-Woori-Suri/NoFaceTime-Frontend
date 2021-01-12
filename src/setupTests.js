import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

export const renderWithRouter = component => render(<Router>{component}</Router>);
export const mountWithRouter = component => mount(<Router>{component}</Router>);

configure({ adapter: new Adapter() });
