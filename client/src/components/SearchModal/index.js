import React, { Component } from 'react';
import { MDBRow } from 'mdbreact';
import SearchResults from '../SearchResults';
import PlatformPills from '../PlatformPills';
import RadioButtons from "../RadioButtons";
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
class SearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: true,
      gameToSearch: "",
      searchResults: null,
      gameChosenFromSearch: null,
      possiblePlatforms: [],
      platformChosen: null,
      note: "",
      mediaTypeChoices: [
        { label: "Physical", key: "physical-key", checked: false },
        { label: "Digital", key: "digital-key", checked: false }
      ],
      isChecked: [
        { label: "All-time favorite", name: "favorite", key: "favorite-key", checked: false},
        { label: "Backlog (to play)", name: "backlog", key: "backlog-key", checked: false},
        { label: "Beaten", name: "beaten", key: "beaten-key", checked: false},
        { label: "Complete in box", name: "cib", key: "cib-key", checked: false},
        { label: "Now playing", name: "nowPlaying", key: "nowPlaying-key", checked: false},
        { label: "Wishlist", name: "wishlist", key: "wishlist-key", checked: false}
      ],
    };
    this.chooseGame = this.chooseGame.bind();
    this.choosePlatform = this.choosePlatform.bind();
    this.toggle = this.toggle.bind(this);
  }

  scrollToBottom = () => {
    this.endOfSearchResults.scrollIntoView({ behavior: "smooth" });
  }

  toggle() {
    const query = this.state.gameToSearch.trim()
    if (query === "" && this.state.modal === false) {
      alert("Enter a game to search.")
    } else {
      this.setState(prevState => ({
        modal: !prevState.modal
      }), () => {
        if (this.state.modal === true) {
          this.searchGame(this.state.gameToSearch);
        }
      });
    }
  }

  textSearchInputChange = event => {
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
    API.search(searchQuery)
      .then(res=> {
        this.setState({
          searchResults: res.data
        })
      })
      .catch(err => console.log(err));
  }

  chooseGame = (gameIndex) => {
    this.scrollToBottom();
    let newList = [];
    if (this.state.searchResults[gameIndex].platforms !== null) {
      for (let i = 0; i < this.state.searchResults[gameIndex].platforms.length; i++) {
        newList.push(this.state.searchResults[gameIndex].platforms[i].abbreviation); // Change to .name for full system name
      }
      this.setState({
          possiblePlatforms: newList,
          gameChosenFromSearch: this.state.searchResults[gameIndex]
        }, () => console.log(this.state.gameChosenFromSearch))
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

  chooseMediaType = (index, checkValue) => {
    let otherIndex;
    if (index === 0) {
      otherIndex = 1
    } else {
      otherIndex = 0
    }
    
    const value = !checkValue
    let copy = this.state.mediaTypeChoices;
    copy[index].checked = value;
    copy[otherIndex].checked = !value;

    this.setState({
      mediaTypeChoices: copy
    })
  }

  chooseDatabaseOptions = (index, checkValue) => {
    const value = !checkValue
    let copy = this.state.isChecked;
    copy[index].checked = value;
    this.setState({
      isChecked: copy
    })
  }

  writeNote = (event) => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;

    // Updating the input's state
    this.setState({
      note: value
    }, () => console.log(this.state.note));
  }

  shelve = () => {
    const saved = this.state.gameChosenFromSearch;
    console.log(localStorage.getItem("username"))
    const newGame = {
      username: localStorage.getItem("username"),
      title: saved.name,
      system_type: this.state.platformChosen,
      physical: this.state.mediaTypeChoices[0].checked,
      box_art: saved.image.medium_url,
      description: saved.deck,
      note: this.state.note,
      guid: saved.guid,
      year_released: saved.expected_release_year,
      favorite: this.state.isChecked[0].checked,
      backlog: this.state.isChecked[1].checked,
      is_beaten: this.state.isChecked[2].checked,
      cib: this.state.isChecked[3].checked,
      now_playing: this.state.isChecked[4].checked, 
      wishlist: this.state.isChecked[5].checked,
      points: 0,
    }
    API.addGame(newGame)
    .then(res=> {
      console.log(res.data)
    })
    .catch(err => console.log(err));
  }

  render() {
    if (this.props.searchOption === "text") {
      return (
        <div>
          <Form inline onSubmit={(e) => e.preventDefault()}>
              <FormControl type="text" onChange={this.textSearchInputChange} value={this.state.gameToSearch} name="gameToSearch" placeholder="type game title" className="mr-sm-2" />
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
                  <h3>Platform</h3>
                  {(this.state.possiblePlatforms.length > 0) && 
                    <PlatformPills possiblePlatforms={this.state.possiblePlatforms} choosePlatform={this.choosePlatform} platformChosen={this.state.platformChosen}>Choose a platform: </PlatformPills>
                  }
              </div>
              <hr/>   

              <h3>Media type</h3> 
              <MDBRow>
                <RadioButtons chooseMediaType={this.chooseMediaType} mediaTypeChoices={this.state.mediaTypeChoices}/>
              </MDBRow>
              <hr/>
              
              <h3>Options</h3>
                <MDBRow>
                  <Checkbox chooseDatabaseOptions={this.chooseDatabaseOptions} isChecked={this.state.isChecked}/>
                </MDBRow>
              <hr/>

              <h3>Notes</h3>
              <Field>
                <Input note={this.state.note} onChange={this.writeNote}/>
                <Message>Notes and options can be changed later.</Message>
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
              <FormControl type="text" onChange={this.textSearchInputChange} value={this.state.gameToSearch} placeholder="scan barcode" className="mr-sm-2" />
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