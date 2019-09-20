import React, { Component } from 'react';

class Logo extends Component {
  render() {
    const { height } = this.props;
    return (
      <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 0 181.42 80.91">
        <g>
          <path d="M46.8,27.39c0-2.65,1-4.37-2.1-7.87L40,13.91c-2.71-2.53.32-2.53,2.6-2.53H58.19V37.94H70.58V11.38h16.7V0H33.21c-6.58,0-9.8,6.32-9.62,9.61S24.38,17,29.85,22c5,4.54-2.47,3.29-3.22,3.29H0V37.94H37A10.43,10.43,0,0,0,46.8,27.39Z"/>
          <path d="M113.09,37.94H125.3L114.68,0h-20L83.49,37.94H96l2-5.31h13.16ZM100.76,23.52l4.3-13.91,4,13.91Z"/>
          <path d="M164.77,25.29c-4.8,0-4.8-1.77-4.8-1.77,4.12,0,7.77-6,7.77-12.14S161.74,0,156.93,0H130V37.94H143.7V25.29s5.82,6.83,8.86,9.62,3.29,3,7.41,3h21.45V25.29Zm-12.39-8.85H143.7V9.61h8.68C156.35,9.61,157,16.44,152.38,16.44Z"/>
          <polygon points="43.08 42.75 39.28 55.4 35.48 42.75 20.81 42.75 17.52 55.4 13.98 42.75 0 42.75 11.2 80.7 22.58 80.7 28.08 62.74 32.95 80.7 44.09 80.7 55.22 42.75 43.08 42.75"/>
          <path d="M63.92,43,52.72,80.91H65.19l2-5.31H80.37l1.95,5.31H94.54L83.91,43ZM70,66.49l4.3-13.91,4,13.91Z"/>
          <path d="M146.61,52.63c.18,3.29.78,7.43,6.25,12.4,5,4.53-2.47,3.29-3.22,3.29H134.92a7.21,7.21,0,0,1-4.85-1.83c4.12,0,7.77-6,7.77-12.14S131.84,43,127,43H100.15V80.9h13.66V68.25s5.82,6.84,8.85,9.62,3.29,3,7.41,3l29.9-.2c4.3,0,10.8-4,10.8-10.55,0-2.65.06-4.11-3.05-7.61L163,56.93c-2.71-2.53-.23-2.79,2.05-2.79h16.39V42.75H155.85C149.27,42.75,146.43,49.34,146.61,52.63ZM122.48,59.4h-8.67V52.57h8.67C126.46,52.57,127.14,59.4,122.48,59.4Z"/>
        </g>
      </svg>
    );
  }
};

export default Logo;
