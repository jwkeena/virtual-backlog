import React from 'react';
import WaterWave from 'react-water-wave';
// import { render } from 'react-dom';
import './index.css';
// import WaterWave from '../../index';

const image = './bobomb.jpg';

const Painting = () => {
  return (
    <WaterWave
      style={{ top: '-50', left: '-50', width: '100%', height: '100%' }}
      imageUrl={image}
    >
      { }
    </WaterWave>
  );
};
export default Painting