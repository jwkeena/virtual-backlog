import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Field, Input } from '@zendeskgarden/react-forms';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
export default class SortingDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.togglePopoverTag = this.togglePopoverTag.bind(this);
    this.togglePopoverAbbr = this.togglePopoverAbbr.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      popoverOpenTag: false,
      popoverOpenAbbr: false,
      customTitleSearch: "",
      customSystemSearch: "",
      customTagSearch: "",
      customYearSearch: ""
    };
  }

  componentWillUnmount() {
    clearTimeout(this._debounceTimer);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  togglePopoverTag() {
    this.setState({
      popoverOpenTag: !this.state.popoverOpenTag
    });
  }

  togglePopoverAbbr() {
    this.setState({
      popoverOpenAbbr: !this.state.popoverOpenAbbr
    });
  }

  typeCustomSearch = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    this.setState({
      [name]: value,
      ...(name === "customTitleSearch" && { customSystemSearch: "", customTagSearch: "", customYearSearch: "" }),
      ...(name === "customSystemSearch" && { customTitleSearch: "", customTagSearch: "", customYearSearch: "" }),
      ...(name === "customTagSearch" && { customTitleSearch: "", customSystemSearch: "", customYearSearch: "" }),
      ...(name === "customYearSearch" && { customTitleSearch: "", customSystemSearch: "", customTagSearch: "" }),
    });

    clearTimeout(this._debounceTimer);
    this._debounceTimer = setTimeout(() => {
      const lowerValue = value.toLowerCase();
      const sortKeys = {
        customTitleSearch: "title",
        customSystemSearch: "system",
        customTagSearch: "tag",
        customYearSearch: "year",
      };
      if (sortKeys[name]) {
        this.props.updateSortOption(sortKeys[name], lowerValue);
      }
    }, 300);
  }

  render() {
    return (
      <ButtonDropdown direction="up" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
        <span style={{color: "rgb(198,192,182)"}}>sorted by</span> <span className="text-warning">{
            this.props.sortOption === "system_type" ? "all" 
            : this.props.sortOption === "is_beaten" ? "beaten" 
            : this.props.sortOption === "favorite" ? "all-time favorite" 
            : this.props.sortOption === "now_playing" ? "now playing" 
            : this.props.sortOption === "cib" ? "complete in box" 
            : this.props.sortOption }</span>
        </DropdownToggle>
        <DropdownMenu style={{backgroundColor: '#f1f1f1'}}>

        <DropdownItem toggle={false} >
          <Field>
            <Input
              id="PopoverFocusTag" 
              name="customTagSearch"
              value={this.state.customTagSearch}
              onChange={this.typeCustomSearch} 
              placeholder="Tag"/>
          </Field>
        </DropdownItem>
        <Popover 
          placement="right" 
          trigger="focus" 
          isOpen={this.state.popoverOpenTag} 
          target="PopoverFocusTag" 
          toggle={this.togglePopoverTag}>
          <PopoverHeader>All tags in use</PopoverHeader>
          <PopoverBody>| &nbsp;
            {this.props.allTags.map((tag, index) => (
              <span key={index}><b>{tag}</b> | </span>
            ))}
            </PopoverBody>
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
              id="PopoverFocusAbbr" 
              name="customSystemSearch"
              value={this.state.customSystemSearch}
              onChange={this.typeCustomSearch} 
              placeholder="System abbreviation"/>
          </Field>
        </DropdownItem>
        <Popover 
          placement="right" 
          trigger="focus" 
          isOpen={this.state.popoverOpenAbbr} 
          target="PopoverFocusAbbr" 
          toggle={this.togglePopoverAbbr}>
          <PopoverHeader>All systems in collection</PopoverHeader>
          <PopoverBody>| &nbsp;
            {this.props.allSystemAbbreviations.map((abbr, index) => (
              <span key={index}><b>{abbr}</b> | </span>
            ))}
            </PopoverBody>
        </Popover>

        <DropdownItem toggle={false} >
          <Field>
            <Input 
              name="customYearSearch"
              value={this.state.customYearSearch}
              onChange={this.typeCustomSearch} 
              placeholder="Year"/>
          </Field>
        </DropdownItem>

        <DropdownItem onClick={() => {this.props.updateSortOption("wishlist")}}>wishlist (not in collection)</DropdownItem>
        <DropdownItem onClick={() => {this.props.updateSortOption("cib")}}>complete in box</DropdownItem>
        <DropdownItem onClick={() => {this.props.updateSortOption("favorite")}}>all-time favorite</DropdownItem>
        <DropdownItem onClick={() => {this.props.updateSortOption("now_playing")}}>now playing</DropdownItem>
        <DropdownItem onClick={() => {this.props.updateSortOption("backlog")}}>backlog</DropdownItem>
        <DropdownItem onClick={() => {this.props.updateSortOption("is_beaten")}}>beaten</DropdownItem>
        <DropdownItem onClick={() => {this.props.updateSortOption("physical")}}>physical</DropdownItem>
        <DropdownItem onClick={() => {this.props.updateSortOption("digital")}}>digital</DropdownItem>
        <DropdownItem onClick={() => {this.props.updateSortOption("system_type")}}>all</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}