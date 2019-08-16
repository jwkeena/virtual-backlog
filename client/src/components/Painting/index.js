import * as React from 'react';
import { render } from 'react-dom';
// import GithubCorner from 'react-github-corner';
// import GradientButton from 'react-linear-gradient-button';

import './index.css';
import WaterWave from '../../index';

const image = './bobomb.jpg';

const Demo = () => {
  return (
    <WaterWave
      style={{ top: '-50', left: '-50', width: '100%', height: '100%' }}
      imageUrl={image}
    >
      { }
    </WaterWave>
  );
};

render(<Demo />, document.querySelector('#demo'));
