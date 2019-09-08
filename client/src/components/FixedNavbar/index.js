import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import API from '../../utils/API';
import SearchModal from "../SearchModal";
import { Redirect } from 'react-router-dom';
import BarcodeScanController from '../BarcodeScanController';
import ShareButtons from "../ShareButtons";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import classnames from "classnames";
import './styles.css';

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
      // prevScrollpos: window.pageYOffset,
      // visible: true,
      shareModal: false,
      customLink: "https://virtualbacklog.herokuapp.com/users/" + this.props.username,
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

// componentDidMount() {
//   window.addEventListener("scroll", this.handleScroll);
// }

// componentWillUnmount() {
//   window.removeEventListener("scroll", this.handleScroll);
// }

// handleScroll = () => {
//   const { prevScrollpos } = this.state;

//   const currentScrollPos = window.pageYOffset;
//   const visible = prevScrollpos > currentScrollPos;

//   this.setState({
//     prevScrollpos: currentScrollPos,
//     visible
//   });
// };

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
    // <div className={classnames("visible", {
    //   "hidden": !this.state.visible
    // })}>
      <Navbar bg="secondary" variant="dark">
        
        <Nav className="mr-auto">
          <Navbar.Brand className="mr-auto text-warning pixel-font">{this.props.username}'s virtual backlog</Navbar.Brand>&nbsp;&nbsp;
          <Nav.Link href="/">home</Nav.Link>
          <Nav.Link onClick={this.toggle}>share</Nav.Link>
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

            <ModalHeader toggle={this.toggle}  className="text-warning" style={{backgroundColor: "#7c8d9c"}}>
            </ModalHeader>

            <ModalBody style={{backgroundColor: "beige"}}>
              <div style={styles.middle}>
                  <h5>your custom link is:</h5><br/>
                  <h5><a href={this.state.customLink}>{this.state.customLink}</a></h5><br/>
                <ShareButtons customLink={this.state.customLink}/>
              </div>
            </ModalBody>

        </Modal>
    // </div>
      );
    }
  }
}

export default FixedNavbar;