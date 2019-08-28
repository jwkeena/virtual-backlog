import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import API from '../../utils/API';
import SearchModal from "../SearchModal";
import { Redirect } from 'react-router-dom';
import BarcodeScanController from '../BarcodeScanController';

class FixedNavbar extends Component {

state = {
    loggedIn: this.props.loggedIn,
    redirectTo: null,
    search: "text",
    gameToSearch: "",
    barcodeSearchResult: null,
    manualSearch: false,
}

logout = event => {
  event.preventDefault();
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
  })
}

updateGameToSearch = (newGame) => {
  this.setState({
    gameToSearch: newGame
  })
}

updateTextSearch = (newGame) => {
  this.setState({
    gameToSearch: newGame
  })
}

updateManualSearch = () => {
  this.setState(prevState => ({
    manualSearch: !prevState.manualSearch
  }))
}

updateBarcodeSearchResult = (gameName) => {
  this.setState({
    barcodeSearchResult: gameName
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
                <Dropdown.Item href="#/action-2">beaten</Dropdown.Item>
                <Dropdown.Item href="#/action-2">digital</Dropdown.Item>
                <Dropdown.Item href="#/action-2">physical</Dropdown.Item>
                <Dropdown.Item href="#/action-2">favorite</Dropdown.Item>
                <Dropdown.Item href="#/action-3">now playing</Dropdown.Item>
                <Dropdown.Item href="#/action-3">year released</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          <Nav.Link>recommended</Nav.Link>
          <Nav.Link onClick={this.logout}>logout</Nav.Link>
        </Nav>

        <Navbar.Brand className="mx-auto">{this.props.username}'s virtual backlog</Navbar.Brand>

        <Nav className="ml-auto">
          <BarcodeScanController 
            searchOption={this.state.search} 
            updateSearchOption={this.updateSearchOption} 
            updateBarcodeSearchResult={this.updateBarcodeSearchResult}
            updateManualSearch={this.updateManualSearch}
            updateGameToSearch={this.updateGameToSearch}
            manualSearch={this.state.manualSearch}
            barcodeToSearch={this.state.barcodeToSearch}
            updateTextSearch={this.updateTextSearch}/>
          <SearchModal 
            loadGames={this.props.loadGames} 
            searchOption={this.state.search} 
            updateSearchOption={this.updateSearchOption}
            updateTextSearch={this.updateTextSearch} 
            gameToSearch={this.state.gameToSearch} 
            barcodeSearchResult={this.state.barcodeSearchResult}
            updateGameToSearch={this.updateGameToSearch}/>
        </Nav>

      </Navbar>
      );
    }
  }
}

export default FixedNavbar;