import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

class FixedNavbarShare extends Component {

state = {
    loggedIn: this.props.loggedIn
}

render() {
  return (
    <Navbar bg="dark" variant="dark">
      
      <Nav className="mr-auto">
        <Navbar.Brand className="mr-auto">{this.props.sharingUser}'s virtual backlog</Navbar.Brand>&nbsp;&nbsp;
        <Nav.Link href="/">home</Nav.Link>
      </Nav>

      <Nav className="ml-auto">
      </Nav>

    </Navbar>
    );
  }
}

export default FixedNavbarShare;