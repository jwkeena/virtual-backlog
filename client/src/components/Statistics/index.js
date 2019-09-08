import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SortingDropdown from '../SortingDropdown';
import '../FixedNavbar/styles.css';
class Statistics extends Component {

render() {

  return (
      <Navbar bg="secondary" variant="dark" style={{ maxWidth: "100%" }} className="visible-bottom">
        <Nav className="mr-auto">
            <SortingDropdown
              allTags={this.props.allTags}
              sortOption={this.props.sortOption}
              updateSortOption={this.props.updateSortOption}/>
        </Nav>
        <Navbar.Brand className="ml-auto">
            <span style={{color: "rgb(198,192,182)"}}>games on display: </span> 

              {(this.props.amountOfGamesSorted === 0) 
                ? <span className="text-warning">0</span>
                : <span 
                  className="text-warning">
                  {this.props.amountOfGamesSorted} {(this.props.amountOfGamesInCollection && this.props.sortOption !== "wishlist") && " (" + (this.props.amountOfGamesSorted / this.props.amountOfGamesInCollection).toFixed(2) * 100 + "% of collection" + ")"}
                </span>
              }
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default Statistics;