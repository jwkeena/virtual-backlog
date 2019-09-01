import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';

class Statistics extends Component {

render() {

  return (
      <Navbar bg="dark" fixed="bottom" variant="dark" style={{ minWidth: 700 }}>
        <Navbar.Brand className="mx-auto text-white">
            games on display: {this.props.amountOfGamesSorted} {(this.props.amountOfGamesInCollection && this.props.sortOption !== "wishlist") && " (" + (this.props.amountOfGamesSorted / this.props.amountOfGamesInCollection).toFixed(2) * 100 + "% of collection" + ")"}
        </Navbar.Brand>
      </Navbar>
      );
  }
}

export default Statistics;