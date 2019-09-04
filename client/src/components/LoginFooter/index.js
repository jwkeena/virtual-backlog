import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const styles = {
  beige: {
      color: "beige"
  },
}
class LoginFooter extends Component {

render() {

  return (
      <Navbar bg="dark" fixed="bottom" variant="dark">
        <Nav className="mx-auto" style={styles.beige}>
        &copy;&nbsp;
        <a style={styles.beige} target="_blank" rel="noopener noreferrer" href="https://jwkeena.github.io/">Justin Keena</a>&nbsp;and&nbsp;
        <a style={styles.beige} target="_blank" rel="noopener noreferrer" href="https://captainefff.github.io/">David Banville</a>&nbsp; 
        
        </Nav>
      </Navbar>
      );
  }
}

export default LoginFooter;