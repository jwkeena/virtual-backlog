import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import API from '../../utils/API';
import SearchModal from "../SearchModal";
import { Redirect } from 'react-router-dom';
import BarcodeScanController from '../BarcodeScanController';
import ShareButtons from "../ShareButtons";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const styles = {
  middle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  }
}
class FixedNavbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shareModal: false,
      customLink: "https://virtualbacklog.herokuapp.com/" + this.props.username,
      backdrop: true,
      loggedIn: this.props.loggedIn,
      redirectTo: null,
      search: "text",
      gameToSearch: "",
      barcodeSearchResult: null,
      manualSearch: false
    };
    this.toggle = this.toggle.bind(this);
  }

toggle() {
    this.setState(prevState => ({
    shareModal: !prevState.shareModal
    }))
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
    <div>
      <Navbar bg="dark" variant="dark">
        
        <Nav className="mr-auto">
          <Navbar.Brand className="mr-auto">{this.props.username}'s virtual backlog</Navbar.Brand>&nbsp;&nbsp;
          <Nav.Link onClick={this.toggle}>share</Nav.Link>
          <Nav.Link href="/">home</Nav.Link>
          <Nav.Link onClick={this.logout}>logout</Nav.Link>
        </Nav>

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

        {/* Share Modal */}
        <Modal 
          centered
          size={"lg"} 
          autoFocus={true} 
          isOpen={this.state.shareModal} 
          toggle={this.toggle} 
          className={this.props.className} 
          backdrop={this.state.backdrop}>

            <ModalHeader toggle={this.toggle}>
            </ModalHeader>

            <ModalBody>
              <div style={styles.middle}>
                  <h5>your custom link is: {this.state.customLink}</h5><br/>
                <ShareButtons customLink={this.state.customLink}/>
              </div>
            </ModalBody>

        </Modal>
    </div>
      );
    }
  }
}

export default FixedNavbar;