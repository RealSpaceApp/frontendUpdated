import React from 'react';
import { SvgXml } from 'react-native-svg';

const Home = () => {
  const svgContent = `
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3303 2.91246C13.5479 2.30392 12.4523 2.30392 11.6699 2.91246L2.58749 9.97655C1.77163 10.6112 2.22186 11.917 3.25331 11.917H4.33339V20.5836C4.33339 21.7803 5.30351 22.7503 6.50006 22.7503H19.5001C20.6967 22.7503 21.6668 21.7803 21.6668 20.5836V11.917H22.7469C23.7794 11.917 24.2278 10.6105 23.4127 9.97655L14.3303 2.91246Z" fill="white"/>
  </svg>
  `;

  return <SvgXml xml={svgContent} />;
};

export default Home;