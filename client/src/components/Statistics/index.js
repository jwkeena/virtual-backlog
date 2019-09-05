import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SortingDropdown from '../SortingDropdown';
import classnames from "classnames";
import '../FixedNavbar/styles.css';
class Statistics extends Component {

state = {
    prevScrollpos: window.pageYOffset,
    visible: true
}

componentDidMount() {
  window.addEventListener("scroll", this.handleScroll);
}

componentWillUnmount() {
  window.removeEventListener("scroll", this.handleScroll);
}

handleScroll = () => {
  const { prevScrollpos } = this.state;

  const currentScrollPos = window.pageYOffset;
  const visible = prevScrollpos > currentScrollPos;

  this.setState({
    prevScrollpos: currentScrollPos,
    visible
  });
};

render() {

  return (
    <div className={classnames("visible-bottom", {
      "hidden-bottom": !this.state.visible
    })}>
      <Navbar bg="dark" variant="dark" style={{ maxWidth: "100%" }}>
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
    </div>
    );
  }
}

export default Statistics;