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
      <ButtonDropdown direction="up" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          sorted by {
            this.props.sortOption === "system_type" ? "system" 
            : this.props.sortOption === "is_beaten" ? "beaten" 
            : this.props.sortOption === "now_playing" ? "now playing" 
            : this.props.sortOption === "year_released" ? "year released" 
            : this.props.sortOption === "cib" ? "complete in box" 
            : this.props.sortOption }
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {this.props.updateSortOption("title")}}>title</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("system_type")}}>system</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("is_beaten")}}>beaten</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("digital")}}>digital</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("physical")}}>physical</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("backlog")}}>backlog</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("now_playing")}}>now playing</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("year_released")}}>year released</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("favorite")}}>all-time favorite</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("cib")}}>complete in box</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("wishlist")}}>wishlist (not in collection)</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}