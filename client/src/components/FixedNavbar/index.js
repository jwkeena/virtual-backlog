import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Navbar from 'react-bootstrap/Navbar';

class FixedNavbar extends Component {
    
render() {
  return (

    <Navbar bg="dark" variant="dark" style={{ minWidth: 700 }}>
    <Navbar.Brand>{this.props.username}'s virtual backlog</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/logout">logout</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search by title" className="mr-sm-2" />
      <Button variant="outline-light">Add game</Button>
    </Form>
  </Navbar>

    );
  }
}

export default FixedNavbar;