import React, { Component } from 'react';
import SearchResults from '../SearchResults';
import { Table } from 'reactstrap';
import FormControl from 'react-bootstrap/FormControl';
import Button from "react-bootstrap/Button";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import API from "../../utils/API";

class SearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: true,
      newGame: "",
      searchResults: null
    };
    this.chooseGame = this.chooseGame.bind();
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }), () => {
      if (this.state.modal === true) {
        this.searchGame(this.state.newGame);
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
    console.log(gameIndex);
    console.log(this.state.searchResults[gameIndex])
  }

  shelve = (game) => {
    console.log(game)
  }

  render() {
    if (this.props.searchOption === "text") {
      return (
        <div>
          <Form inline onSubmit={(e) => e.preventDefault()}>
              <FormControl type="text" onChange={this.handleInputChange} value={this.state.newGame} name="newGame" placeholder="type game title" className="mr-sm-2" />
              <Button type="submit" onClick={this.toggle} variant="outline-light">go</Button>  
          </Form>
          <Modal size={"lg"} autoFocus={true} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
            <ModalHeader toggle={this.toggle}>Searching for "{this.props.gameToSearch}"</ModalHeader>
            <ModalBody>
              <Table hover>
          
                    {(this.state.searchResults) && 
                      <SearchResults>{this.state.searchResults}{this.chooseGame}</SearchResults>
                    }

              </Table>
            </ModalBody>
            <ModalFooter>

              <Button color="primary" size="lg" onClick={this.shelve}>Shelve</Button>{' '}
            </ModalFooter>
          </Modal>
        </div>
      );
    }

    if (this.props.searchOption === "barcode") {
      return (
        <div>
          <Form inline onSubmit={(e) => e.preventDefault()}>
              <FormControl type="text" onChange={this.handleInputChange} value={this.state.newGame} placeholder="scan barcode" className="mr-sm-2" />
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