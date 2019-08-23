import React, { Component } from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import SearchResults from '../SearchResults';
import PlatformPills from '../PlatformPills';
import MediaOptions from "../MediaOptions";
import Checkbox from "../Checkbox";
import { Table } from 'reactstrap';
import FormControl from 'react-bootstrap/FormControl';
import { Button } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import API from "../../utils/API";
import { Field, Input, Message } from '@zendeskgarden/react-forms';
import { Spinner } from 'reactstrap';

const styles = {
  container: {
    position: "relative",
    textAlign: "center",
    color: "red"
  },
  middleOfDiv: {
    position: "absolute",
    bottom: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
}

const mediaTypeChoices = {
  choices:
  [
    { text: 'Physical', value: '1' },
    { text: 'Digital', value: '2' }
  ]
}
class SearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: true,
      gameToSearch: "",
      searchResults: null,
      possiblePlatforms: [],
      platformChosen: null,
      physicalOrDigital: null,
      isChecked: [
        {label: "All-time favorite", name: "favorite", key: "favorite-key", checked: false},
        {label: "Backlog (to play)", name: "backlog", key: "backlog-key", checked: false},
        {label: "Beaten", name: "beaten", key: "beaten-key", checked: false},
        {label: "Complete in box", name: "cib", key: "cib-key", checked: false},
        {label: "Now playing", name: "nowPlaying", key: "nowPlaying-key", checked: false},
        {label: "Wishlist", name: "wishlist", key: "wishlist-key", checked: false}
      ],
      gameToShelve: {
        title: null,
        system_type: null,
        physical: null,
        developer: null,
        box_art: null,
        description: null,
        is_beaten: null,
        favorite: null,
        now_playing: null, 
        wishlist: null,
        backlog: null,
        cib: null,
        price: null,
        year_released: null,
        points: null,
        similar: null,
      },
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

  chooseMediaType = (type) => {
    console.log(type)
  }

  chooseDatabaseOptions = (index, checkValue) => {
    const value = !checkValue
    let copy = this.state.isChecked;
    copy[index].checked = value;
    this.setState({
      isChecked: copy
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
                    {(this.state.searchResults) 
                      ? 
                        <Table hover>
                          <SearchResults searchResults={this.state.searchResults} chooseGame={this.chooseGame}></SearchResults>
                        </Table>
                      : 
                        <div style={styles.container}> <Spinner style={styles.middle} size='lg' color="primary" /></div>
                    }
              <hr/>

              <form>
              <div>
                  <h3>Platform (required): </h3>
                  {(this.state.possiblePlatforms.length > 0) && 
                    <PlatformPills possiblePlatforms={this.state.possiblePlatforms} choosePlatform={this.choosePlatform} platformChosen={this.state.platformChosen}>Choose a platform: </PlatformPills>
                  }
              </div>
              <hr/>   

              <h3>Media type (required):</h3> 
              <MDBRow>
                <MediaOptions chooseMediaType={this.chooseMediaType}physicalOrDigital={this.state.physicalOrDigital} model={mediaTypeChoices}/>
              </MDBRow>
              <hr/>
              
              <h3>Options</h3>
                <MDBRow>
                  <Checkbox chooseDatabaseOptions={this.chooseDatabaseOptions} isChecked={this.state.isChecked}/>
                </MDBRow>
              <hr/>

              <h3>Notes</h3>
              <Field>
                <Input />
                <Message>Notes can be changed later.</Message>
              </Field>
            </form>

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