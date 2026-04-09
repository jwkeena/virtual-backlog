import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SortingDropdown from '../SortingDropdown';
import PieChartModal from './PieChartModal';
import '../FixedNavbar/styles.css';

class Statistics extends Component {

  state = {
    showChart: false,
  }

  toggleChart = () => {
    this.setState(prev => ({ showChart: !prev.showChart }));
  }

render() {

  return (
    <>
      <Navbar bg="secondary" variant="dark" style={{ maxWidth: "100%" }} className="visible-bottom">
        <Nav className="mr-auto">
            <SortingDropdown
              allTags={this.props.allTags}
              allSystemAbbreviations={this.props.allSystemAbbreviations}
              sortOption={this.props.sortOption}
              updateSortOption={this.props.updateSortOption}/>
        </Nav>
        <Navbar.Brand className="ml-auto" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              onClick={this.toggleChart}
              title="Games by system"
              style={{ cursor: 'pointer', fontSize: '1.1rem', color: 'rgb(198,192,182)' }}>
              &#9685;
            </span>
            <span style={{color: "rgb(198,192,182)"}}>games on display: </span>

              {(this.props.amountOfGamesSorted === 0)
                ? <span className="text-warning">0</span>
                : <span
                  className="text-warning">
                  {this.props.amountOfGamesSorted} {(this.props.amountOfGamesInCollection && this.props.sortOption !== "wishlist") && " (" + ((this.props.amountOfGamesSorted / this.props.amountOfGamesInCollection) * 100).toFixed(2) + "% of collection" + ")"}
                </span>
              }
        </Navbar.Brand>
      </Navbar>
      <PieChartModal
        isOpen={this.state.showChart}
        toggle={this.toggleChart}
        games={this.props.gamesSorted}
      />
    </>
    );
  }
}

export default Statistics;
