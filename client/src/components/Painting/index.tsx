import * as React from 'react';
import { render } from 'react-dom';
// import GithubCorner from 'react-github-corner';
// import GradientButton from 'react-linear-gradient-button';

import './index.css';
import WaterWave from '../../src';

const image: string = require('./assets/bobomb.jpg');

const Demo = () => {
  return (
    <WaterWave
      style={{ top: '-50', left: '-50', width: '100%', height: '100%' }}
      imageUrl={image}
    >
      {/* {({ pause, play }) => (
        <div className="container">
          <GithubCorner href="https://github.com/xxhomey19/react-water-wave" />
          <h1>React Water Wave</h1>
          <GradientButton className="button" theme="Royal" onClick={pause}>
            Pause
            <span role="img" aria-label="Pause">
              🙅‍
            </span>
          </GradientButton>
          <GradientButton className="button" theme="Quepal" onClick={play}>
            Play{' '}
            <span role="img" aria-label="Play">
              🙆‍
            </span>
          </GradientButton>
          <h3>
            MIT ©{' '}
            <a
              href="https://github.com/xxhomey19"
              target="_blank"
              rel="noopener noreferrer"
            >
              xxhomey19
            </a>
          </h3>
        </div>
      )} */}
    </WaterWave>
  );
};

render(<Demo />, document.querySelector('#demo'));
