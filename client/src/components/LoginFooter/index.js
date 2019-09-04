import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const styles = {
  link: {
      color: "white"
  }
}
class LoginFooter extends Component {

render() {

  return (
      <Navbar bg="dark" fixed="bottom" variant="dark" style={{ minWidth: 700 }}>
        <Nav className="mx-auto text-white">
        &copy;&nbsp;
        <a style={styles.link} target="_blank" rel="noopener noreferrer" href="https://jwkeena.github.io/">Justin Keena</a>&nbsp;and&nbsp;
        <a style={styles.link} target="_blank" rel="noopener noreferrer" href="https://captainefff.github.io/">David Banville</a>&nbsp; 
        
        </Nav>
      </Navbar>
      );
  }
}

export default LoginFooter;