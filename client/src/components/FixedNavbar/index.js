import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import API from '../../utils/API';
import SearchModal from "../SearchModal";
import { Redirect } from 'react-router-dom';
import SearchOptions from '../SearchOptions';

class FixedNavbar extends Component {
  
state = {
  loggedIn: this.props.loggedIn,
  redirectTo: null,
  search: "text"
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

updateSearchOption = (newOption) => {
  this.setState({
    search: newOption
  }, () => {
    console.log("Navbar, ", this.state.search)
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
          <Nav.Link>recommended</Nav.Link>
          <Nav.Link onClick={this.logout}>logout</Nav.Link>
        </Nav>

        <Navbar.Brand className="mx-auto">{this.props.username}'s virtual backlog</Navbar.Brand>

        <Nav className="ml-auto">
          <SearchOptions searchOption={this.state.search} updateSearchOption={this.updateSearchOption}/>
          <SearchModal searchOption={this.state.search} />
        </Nav>

      </Navbar>
      );
    }
  }
}

export default FixedNavbar;