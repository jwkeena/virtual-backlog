import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import classnames from "classnames";
import '../FixedNavbar/styles.css';

class FixedNavbarShare extends Component {

state = {
    loggedIn: this.props.loggedIn,
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
    <div className={classnames("visible", {
      "hidden": !this.state.visible
    })}>
    <Navbar bg="secondary" variant="dark">
      
      <Nav className="mr-auto">
        <Navbar.Brand className="mr-auto text-warning pixel-font">{this.props.sharingUser}'s virtual backlog</Navbar.Brand>&nbsp;&nbsp;
        <Nav.Link href="/">home</Nav.Link>
      </Nav>

      <Nav className="ml-auto">
      </Nav>

    </Navbar>
    </div>
    );
  }
}

export default FixedNavbarShare;