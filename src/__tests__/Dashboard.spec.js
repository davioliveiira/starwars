import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dashboard from '../containers/Dashboard';
import store from '../store';
import mockAxios from 'jest-mock-axios';

configure({ adapter: new Adapter() });

afterEach(() => {
  mockAxios.reset();
});

const mockData = (items = []) => ({
  data: {
    results: [...items],
  }
});

const TestContext = () => (
  <Provider store={store}>
    <BrowserRouter basename="/">
      <Dashboard />
    </BrowserRouter>
  </Provider>
);

it('renders without crashing', () => {
  shallow(<TestContext />);
});

describe('Elements', () => {
  it('have a title page', () => {
    const component = mount(<TestContext />);
    mockAxios.mockResponse(mockData());
    component.update();
    expect(component.find('.page-title').length).toBe(1);
    component.unmount();
  });
});

describe('Data', () => {
  it('have a data in card', () => {
    const component = mount(<TestContext />);

    mockAxios.mockResponse(mockData([
      {
        eye_color: 'blue',
        name: 'Luke Skywalker',
        gender: 'male',
        starships: [],
      }
    ]));

    component.update();
    expect(component.find('.card-people').at(1));
    component.unmount();
  });
});