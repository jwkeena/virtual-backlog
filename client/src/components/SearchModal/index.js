import React, { Component } from 'react';
import SearchResults from '../SearchResults';
import PlatformPills from '../PlatformPills';
import { Table } from 'reactstrap';
import FormControl from 'react-bootstrap/FormControl';
import { Button } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import API from "../../utils/API";

class SearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: true,
      gameToSearch: "",
      searchResults: null,
      gameToShelve: {},
      possiblePlatforms: [],
      platformChosen: ""
    };
    this.chooseGame = this.chooseGame.bind();
    this.choosePlatform = this.choosePlatform.bind();
    this.toggle = this.toggle.bind(this);
  }

  scrollToBottom = () => {
    this.endOfSearchResults.scrollIntoView({ behavior: "smooth" });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }), () => {
      if (this.state.modal === true) {
        this.searchGame(this.state.gameToSearch);
      }
    });
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
    [name]: value
    }, this.props.updateTextSearch(value.trim()));
  };

  searchGame = (searchQuery) => {
    console.log("searchQuery", searchQuery);
    API.searchGame(searchQuery)
      .then(res=> {
        this.setState({
          searchResults: res.data
        })
      })
      .catch(err => console.log(err));
  }

  chooseGame = (gameIndex) => {
    // const gameToSearch = {title, system_type, developer, box_art, description, is_beaten, favorite, now_playing, owned, cib, rating, price, year_released}
    const newList = [];

    console.log(this.state.searchResults[gameIndex].platforms) 
    this.scrollToBottom();

    if (this.state.searchResults[gameIndex].platforms !== null) {
      for (let i = 0; i < this.state.searchResults[gameIndex].platforms.length; i++) {
        newList.push(this.state.searchResults[gameIndex].platforms[i].abbreviation); // Change to .name for full system name
      }
      this.setState({
          possiblePlatforms: newList
        })
    } else {
      this.setState({
        possiblePlatforms: ["NONE"]
      })
    }
  }

  choosePlatform = (platform) => {
    console.log("Platform chosen, ", platform)
    this.setState({
      platformChosen: platform
    })
  }

  shelve = (game) => {
    console.log(game)
  }

  render() {
    if (this.props.searchOption === "text") {
      return (
        <div>
          <Form inline onSubmit={(e) => e.preventDefault()}>
              <FormControl type="text" onChange={this.handleInputChange} value={this.state.gameToSearch} name="gameToSearch" placeholder="type game title" className="mr-sm-2" />
              <Button type="submit" onClick={this.toggle} variant="outline-light">go</Button>  
          </Form>
          <Modal scrollable={true} size={"lg"} autoFocus={true} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
            <ModalHeader toggle={this.toggle}>
              Searching for "{this.props.gameToSearch}"
         
            </ModalHeader>
            <ModalBody>
              <Table hover>
                    {(this.state.searchResults) && 
                      <SearchResults>{this.state.searchResults}{this.chooseGame}</SearchResults>
                    }
              </Table>
              <hr/>
              <span>Choose a platform: </span>
              <div>
                  {(this.state.possiblePlatforms.length > 0) && 
                    <PlatformPills possiblePlatforms={this.state.possiblePlatforms} choosePlatform={this.choosePlatform}></PlatformPills>
                  }
              </div>
              <hr/>             

                        {/* Media type:
                        <label class="radio-inline"><input type="radio" name="optradio" checked value="true"/>Physical</label>
                        <label class="radio-inline"><input type="radio" name="optradio" value="false"/>Digital</label>
                        <hr/> */}
          <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.endOfSearchResults = el; }}>
          </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" size="lg" onClick={this.shelve}>add to collection</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }

    if (this.props.searchOption === "barcode") {
      return (
        <div>
          <Form inline onSubmit={(e) => e.preventDefault()}>
              <FormControl type="text" onChange={this.handleInputChange} value={this.state.gameToSearch} placeholder="scan barcode" className="mr-sm-2" />
              <Button onClick={this.toggle} variant="outline-light">go</Button>  
          </Form>
          <Modal size={"lg"} autoFocus={true} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
            <ModalHeader toggle={this.toggle}>Scan barcode</ModalHeader>
            <ModalBody>
              CAMERA HERE
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              <Button color="primary" onClick={this.toggle}>Search</Button>{' '}
            </ModalFooter>
          </Modal>
        </div>
      );
    }
  }
}

export default SearchModal;