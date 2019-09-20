import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Details from '../containers/Dashboard/components/Details';
import { Modal } from 'reactstrap';
import store from '../store';
import mockAxios from 'jest-mock-axios';

configure({ adapter: new Adapter() });

const TestContext = () => (
  <Provider store={store}>
    <BrowserRouter basename="/">
      <Details />
    </BrowserRouter>
  </Provider>
);

it('renders without crashing', () => {
  shallow(<TestContext />);
});

describe('Elements', () => {
  it('successefull render modal', () => {
    const component = mount(<TestContext />);
    expect(component.find(Modal).length).toBeGreaterThan(0);
    component.unmount();
  });
});