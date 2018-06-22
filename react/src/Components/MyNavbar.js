import {Collapse, NavbarToggler, NavbarBrand, Navbar, Nav, NavItem, NavLink, Container} from 'reactstrap';
import React from 'react';
import { NavLink as rrdLink } from 'react-router-dom';

export default class MyNavbar extends React.Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {isOpen: false};
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar color="faded" light expand="md">
        <Container>
          <NavbarBrand>Chris Zelenka</NavbarBrand>
          <NavbarToggler onClick={this.toggle} className="mr-2" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={ rrdLink } exact to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink  tag={ rrdLink } to="/portfolio">Portfolio</NavLink>
              </NavItem>
              <NavItem>
                <NavLink  tag={ rrdLink } to="/resume">Resume</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}
