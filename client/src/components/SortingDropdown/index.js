import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Field, Input } from '@zendeskgarden/react-forms';
export default class SortingDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      customTitleSearch: "",
      customSystemSearch: "",
      customTagSearch: ""
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });

  }

  typeCustomSearch = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    this.setState({
      [name]: value
    }, () => {
      value = value.toLowerCase();
      if (name === "customTitleSearch") {
        this.props.updateCustomTitleSearch(value);
        this.setState({
          customSystemSearch: "",
          customTagSearch: ""
        })
      } 
      if (name === "customSystemSearch") {
        this.props.updateCustomSystemSearch(value);
        this.setState({
          customTitleSearch: "",
          customTagSearch: ""
        })
      }
      if (name === "customTagSearch") {
        this.props.updateCustomTagSearch(value);
        this.setState({
          customTitleSearch: "",
          customSystemSearch: ""
        })
      }       
    });
  }

  render() {
    return (
      <ButtonDropdown direction="up" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className="text-warning" caret>
          sorted by {
            this.props.sortOption === "system_type" ? "system" 
            : this.props.sortOption === "is_beaten" ? "beaten" 
            : this.props.sortOption === "now_playing" ? "now playing" 
            : this.props.sortOption === "year_released" ? "year released" 
            : this.props.sortOption === "cib" ? "complete in box" 
            : this.props.sortOption }
        </DropdownToggle>
        <DropdownMenu>
        <DropdownItem  toggle={false} >
            <Field>
              <Input 
                name="customTagSearch"
                value={this.state.customTagSearch}
                onChange={this.typeCustomSearch} 
                placeholder="Tag"/>
            </Field>
          </DropdownItem>
          <DropdownItem  toggle={false} >
            <Field>
              <Input 
                name="customTitleSearch"
                value={this.state.customTitleSearch}
                onChange={this.typeCustomSearch} 
                placeholder="Title includes..."/>
            </Field>
          </DropdownItem>
          <DropdownItem  toggle={false} >
            <Field>
              <Input 
                name="customSystemSearch"
                value={this.state.customSystemSearch}
                onChange={this.typeCustomSearch} 
                placeholder="System abbreviation"/>
            </Field>
          </DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("system_type")}}>system</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("is_beaten")}}>beaten</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("digital")}}>digital</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("physical")}}>physical</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("backlog")}}>backlog</DropdownItem>
          <DropdownItem onClick={() => {this.props.updateSortOption("title")}}>title (a-z)</DropdownItem>
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