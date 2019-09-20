import React, { Component } from 'react';
import { Logo } from '../../../../components';

class Sidebar extends Component {
  render() {
    return (
      <div className="logo text-center my-4">
        <Logo height={50} />
      </div>
    );
  }
}

export default Sidebar;
