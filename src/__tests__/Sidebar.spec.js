import React from 'react';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Sidebar from '../containers/App/components/Sidebar'

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  shallow(<Sidebar />);
});

describe('Elements', () => {
  it('have a logo', () => {
    const component = mount(<Sidebar />);
    expect(component.find('.logo').length).toBe(1);
    component.unmount();
  });
});