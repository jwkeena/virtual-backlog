import React, { Component } from 'react';
import { MDBRow } from 'mdbreact';
import SearchResults from '../SearchResults';
import PlatformPills from '../PlatformPills';
import RadioButtons from "../RadioButtons";
import Checkbox from "../Checkbox";
import { Table } from 'reactstrap';
import FormControl from 'react-bootstrap/FormControl';
import { Button } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import API from "../../utils/API";
import { Field, Input, Message } from '@zendeskgarden/react-forms';
import { Spinner } from 'reactstrap';

const styles = {
  middle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  }
}
class SearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearchModal: false,
      backdrop: true,
      barcodeSearchResult: "",
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

  componentDidUpdate() {
    if (this.props.searchOption === "barcode" && this.props.gameToSearch !== "") {
      this.props.updateSearchOption("barcode-searching");
      this.setState(prevState => ({
        textSearchModal: !prevState.textSearchModal
      }), () => {
        this.searchGame(this.props.gameToSearch);
      })
    }
  }

  scrollToBottom = () => {
    this.endOfSearchResults.scrollIntoView({ behavior: "smooth" });
  }

  toggle() {
    const query = this.props.gameToSearch.trim()
        
    if (query === "" && this.state.textSearchModal === false) {
      alert("Enter a game to search.")
    } else {
      this.setState(prevState => ({
        textSearchModal: !prevState.textSearchModal
      }), () => {
        if (this.state.textSearchModal === true) {
          this.searchGame(this.props.gameToSearch);
        } else {
          this.resetSearchState();
        }
      });
    }
  }

  textSearchInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;

    // Updating the input's state
    this.props.updateTextSearch(value);
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
    });
  }

  noteShelve = (event) => {
    event.preventDefault();
    this.shelve();
  }

  shelve = () => {
    if (this.state.platformChosen === null) {
      return alert ("Choose a platform before submitting.");
    } else if (this.state.mediaTypeChoices[0].checked === false && this.state.mediaTypeChoices[1].checked === false) {
      return alert ("Select a media type before submitting.")
    }
    const saved = this.state.gameChosenFromSearch;
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
      .then((res) => {
        console.log(res.data);
        this.props.loadGames();
        this.resetSearchState();
      })
      .catch(err => console.log(err));
  }

  resetSearchState = () => {
    this.props.updateGameToSearch("");
    this.setState({
      textSearchModal: false,
      barcodeScanModal: false,
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
      ]
    })
  }

  render() {
    return (
      <div>
        <Form inline onSubmit={(e) => e.preventDefault()}>
            <FormControl type="text" 
              onChange={this.textSearchInputChange} 
              value={this.props.gameToSearch} 
              name="gameToSearch" 
              placeholder={(this.props.searchOption === "text") ? "type game title" : "scan barcode"} 
              className="mr-sm-2" />
            <Button 
              type="submit" 
              onClick={this.toggle} 
              variant="outline-light">go
            </Button>  
        </Form>

        {/* Text Search Modal */}
        <Modal 
          scrollable={true} 
          size={"lg"} 
          autoFocus={true} 
          isOpen={this.state.textSearchModal} 
          toggle={this.toggle} 
          className={this.props.className} 
          backdrop={this.state.backdrop}>

          <ModalHeader toggle={this.toggle}>
            Searching for "{this.props.gameToSearch}"
          </ModalHeader>

          <ModalBody>
                  {(this.state.searchResults) 
                    ? 
                      <Table hover>
                        <SearchResults 
                          searchResults={this.state.searchResults} 
                          chooseGame={this.chooseGame}>
                        </SearchResults>
                      </Table>
                    : 
                      <div style={styles.middle} ><Spinner size='lg'color="primary" /></div>
                  }
            <hr/>

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
            <Form onSubmit={this.noteShelve}>
              <Field>
                <Input note={this.state.note} onChange={this.writeNote} onSubmit={this.shelve}/>
                <Message>Notes and options can be changed later.</Message>
              </Field>
            </Form>

        <div style={{ float:"left", clear: "both" }}
            ref={(el) => { this.endOfSearchResults = el; }}>
        </div>
          </ModalBody>
          <ModalFooter>
            <Button 
              variant="primary" 
              size="lg" 
              onClick={this.shelve}
              block>add to collection
            </Button>
          </ModalFooter>
        </Modal>

      </div>
    );
  }
}

export default SearchModal;