import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Field, Input } from '@zendeskgarden/react-forms';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
export default class SortingDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.togglePopover = this.togglePopover.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      popoverOpen: false,
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

  togglePopover() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
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
        <DropdownToggle caret>
        <span style={{color: "rgb(198,192,182)"}}>sorted by</span> <span className="text-warning">{
            this.props.sortOption === "system_type" ? "system" 
            : this.props.sortOption === "is_beaten" ? "beaten" 
            : this.props.sortOption === "now_playing" ? "now playing" 
            : this.props.sortOption === "year_released" ? "year released" 
            : this.props.sortOption === "cib" ? "complete in box" 
            : this.props.sortOption }</span>
        </DropdownToggle>
        <DropdownMenu style={{backgroundColor: '#f1f1f1'}}>
        <DropdownItem toggle={false} >
          <Field>
            <Input
              id="PopoverFocus" 
              name="customTagSearch"
              value={this.state.customTagSearch}
              onChange={this.typeCustomSearch} 
              placeholder="Tag"/>
          </Field>
        </DropdownItem>
        <Popover placement="right" trigger="focus" isOpen={this.state.popoverOpen} target="PopoverFocus" toggle={this.togglePopover}>
          <PopoverHeader>All tags in use</PopoverHeader>
          <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
        </Popover>
        <DropdownItem toggle={false} >
          <Field>
            <Input 
              name="customTitleSearch"
              value={this.state.customTitleSearch}
              onChange={this.typeCustomSearch} 
              placeholder="Title includes..."/>
          </Field>
        </DropdownItem>
        <DropdownItem toggle={false} >
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