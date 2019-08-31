import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class SortingDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });

  }

  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          sorted by {this.props.sortOption}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {this.props.updateSortOption("title")}}>title</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("system")}}>system</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("digital")}}>digital</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("physical")}}>physical</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("beaten")}}>beaten</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("unbeaten")}}>unbeaten</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("backlog")}}>backlog</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("wishlist")}}>wishlist</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("now playing")}}>now playing</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("year released")}}>year released</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("all-time favorite")}}>all-time favorite</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("complete in box")}}>complete in box</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("not complete in box")}}>not complete in box</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}