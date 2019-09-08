import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SortingDropdown from '../SortingDropdown';
import classnames from "classnames";
import '../FixedNavbar/styles.css';
class Statistics extends Component {

// state = {
//     prevScrollpos: window.pageYOffset,
//     visible: true
// }

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

render() {

  return (
    // <div className={classnames("visible-bottom", {
    //   "hidden-bottom": !this.state.visible
    // })}>
      <Navbar bg="secondary" variant="dark" style={{ maxWidth: "100%" }}>
        <Nav className="mr-auto">
            <SortingDropdown
              updateCustomTitleSearch={this.props.updateCustomTitleSearch}
              updateCustomSystemSearch={this.props.updateCustomSystemSearch}
              updateCustomTagSearch={this.props.updateCustomTagSearch}
              allTags={this.props.allTags}
              sortOption={this.props.sortOption}
              updateSortOption={this.props.updateSortOption}/>
        </Nav>
        <Navbar.Brand className="ml-auto">
            <span style={{color: "rgb(198,192,182)"}}>games on display:</span> <span className="text-warning">{this.props.amountOfGamesSorted} {(this.props.amountOfGamesInCollection && this.props.sortOption !== "wishlist") && " (" + (this.props.amountOfGamesSorted / this.props.amountOfGamesInCollection).toFixed(2) * 100 + "% of collection" + ")"}</span>
        </Navbar.Brand>
      </Navbar>
    // </div>
    );
  }
}

export default Statistics;