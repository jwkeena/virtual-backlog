import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import giantbomblogo from '../../giantbomblogo.png';

const styles = {
  giantbomblogo: {
    height: "25px",
    position: "relative",
    right: "3px"
  }
}

const JumbotronTop = () => {
  return (
    <div>
      <Jumbotron>
          <h2 className="text-center">Virtual Backlog</h2>
          <p className="lead text-center">powered by the&nbsp;&nbsp;<a target="_blank" rel="noopener noreferrer" href="https://www.giantbomb.com/"><img style={styles.giantbomblogo} alt="Giant Bomb Logo" src={giantbomblogo}/></a>&nbsp;api</p>
      </Jumbotron>

    </div>
  );
};

export default JumbotronTop;