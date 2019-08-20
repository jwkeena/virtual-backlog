import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import API from '../../utils/API';
import { Redirect } from 'react-router-dom';

class FixedNavbar extends Component {
  
state = {
  loggedIn: this.props.loggedIn,
  redirectTo: null
}

logout = event => {
  event.preventDefault();
  console.log('logging out');
  API.logout({username: this.props.username}).then(response => {
    console.log(response.data)
    if (response.status === 200) {
      localStorage.removeItem("username")
      this.props.logoutBoolean();
      this.setState({
        redirectTo: "/"
      })
    }
  }).catch(error => {
      console.log("logout error ", error)
  })
}

render() {

  if (this.state.redirectTo) {
    return (
      <div>
        <Redirect to={{ pathname: this.state.redirectTo }}/>
      </div>
    )
  } else {
  return (
      <Navbar bg="dark" variant="dark" style={{ minWidth: 700 }}>
      
        <Nav className="mr-auto">
            <Dropdown>
              <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                sort
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-2">title</Dropdown.Item>
                <Dropdown.Item href="#/action-1">system</Dropdown.Item>
                <Dropdown.Item href="#/action-2">rating</Dropdown.Item>
                <Dropdown.Item href="#/action-2">beaten</Dropdown.Item>
                <Dropdown.Item href="#/action-2">digital</Dropdown.Item>
                <Dropdown.Item href="#/action-2">physical (a-z)</Dropdown.Item>
                <Dropdown.Item href="#/action-2">physical (price)</Dropdown.Item>
                <Dropdown.Item href="#/action-2">favorite</Dropdown.Item>
                <Dropdown.Item href="#/action-3">developer</Dropdown.Item>
                <Dropdown.Item href="#/action-3">now playing</Dropdown.Item>
                <Dropdown.Item href="#/action-3">year released</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          <Nav.Link>scan</Nav.Link>
          <Nav.Link>recommended</Nav.Link>
          <Nav.Link onClick={this.logout}>logout</Nav.Link>
        </Nav>

        <Navbar.Brand className="mx-auto">{this.props.username}'s virtual backlog</Navbar.Brand>

        <Form className="ml-auto" inline>
          <FormControl type="text" placeholder="Search by title" className="mr-sm-2" />
          <Button variant="outline-light">Add game</Button>
        </Form>

      </Navbar>
      );
    }
  }
}

export default FixedNavbar;