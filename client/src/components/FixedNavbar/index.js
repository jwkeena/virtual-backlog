import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Navbar from 'react-bootstrap/Navbar';
import API from '../../utils/API';
import { Redirect } from 'react-router-dom';

class FixedNavbar extends Component {
  
state = {
  redirectTo: null
}

logout = event => {
  event.preventDefault();
  console.log('logging out');
  API.logout({username: this.props.username}).then(response => {
    console.log(response.data)
    if (response.status === 200) {
      localStorage.removeItem("username")
      this.setState({
        loggedIn: false,
        redirectTo: "/"
      })
    }
  }).catch(error => {
      console.log("logout error ", error)
  })
}

render() {
  if (this.state.redirectTo) {
    return <Redirect to={{ pathname: this.state.redirectTo }} />
  } else {
  return (
    <Navbar bg="dark" variant="dark" style={{ minWidth: 700 }}>
    <Navbar.Brand>{this.props.username}'s virtual backlog</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link onClick={this.logout}>logout</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search by title" className="mr-sm-2" />
      <Button variant="outline-light">Add game</Button>
    </Form>
  </Navbar>
      );
    }
  }
}

export default FixedNavbar;