import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import giantbomblogo from '../../Images/giantbomblogo.png';
import Justin from '../../Images/Justin.gif';
import Dave from '../../Images/Dave.gif';
import '../LoginFooter/styles.css';

const styles = {
  giantbomblogo: {
    height: "25px",
    position: "relative",
    right: "3px"
  }
}

const JumbotronTop = () => {
  return (
    <Jumbotron className="custom-container">
        <a href="https://captainefff.github.io" target="_blank" rel="noopener noreferrer"><img className="dave" src = {Dave} alt="David Banviile"/></a>
        <a href="https://jwkeena.github.io" target="_blank" rel="noopener noreferrer"><img className="justin" src = {Justin} alt="Justin Keena"/></a>
        <h2 className="text-center text-warning">Virtual Backlog</h2>
        <p className="lead text-center text-warning">powered by the&nbsp;&nbsp;<a target="_blank" rel="noopener noreferrer" href="https://www.giantbomb.com/"><img style={styles.giantbomblogo} alt="Giant Bomb Logo" src={giantbomblogo}/></a>&nbsp;api</p>
    </Jumbotron>
  );
};

export default JumbotronTop;