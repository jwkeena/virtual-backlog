import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SortingDropdown from '../SortingDropdown';

class Statistics extends Component {

render() {

  return (
      <Navbar bg="dark" fixed="bottom" variant="dark" style={{ maxWidth: "100%" }}>
        <Nav className="mr-auto">
            <SortingDropdown
              updateCustomTitleSearch={this.props.updateCustomTitleSearch}
              updateCustomSystemSearch={this.props.updateCustomSystemSearch}
              sortOption={this.props.sortOption}
              updateSortOption={this.props.updateSortOption}/>
        </Nav>
        <Navbar.Brand className="ml-auto text-white">
            games on display: {this.props.amountOfGamesSorted} {(this.props.amountOfGamesInCollection && this.props.sortOption !== "wishlist") && " (" + (this.props.amountOfGamesSorted / this.props.amountOfGamesInCollection).toFixed(2) * 100 + "% of collection" + ")"}
        </Navbar.Brand>
      </Navbar>
      );
  }
}

export default Statistics;