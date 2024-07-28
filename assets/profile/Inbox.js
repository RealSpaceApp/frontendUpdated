import React from 'react';
import { SvgXml } from 'react-native-svg';

const Inbox = () => {
  const svgContent = `
  <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path opacity="0.15" d="M23.4165 19.5V13H17.9998L15.8332 16.25H11.4998L9.87484 13H3.9165V19.5C3.9165 20.6966 4.88655 21.6667 6.08317 21.6667H21.2498C22.4465 21.6667 23.4165 20.6966 23.4165 19.5Z" fill="black"/>
  <path d="M3.9165 13.0007H9.87484L11.4998 16.2507H15.8332L17.9998 13.0007H23.4165M3.9165 13.0007V19.5006C3.9165 20.6973 4.88655 21.6673 6.08317 21.6673H21.2498C22.4465 21.6673 23.4165 20.6973 23.4165 19.5006V13.0007M3.9165 13.0007L6.9029 5.03694C7.06146 4.6141 7.46568 4.33398 7.91725 4.33398H19.4158C19.8673 4.33398 20.2716 4.6141 20.4301 5.03694L23.4165 13.0007" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  return <SvgXml xml={svgContent} />;
};

export default Inbox;