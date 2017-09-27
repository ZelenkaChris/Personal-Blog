import {Navbar, Nav, NavItem} from 'react-bootstrap';
import React from 'react';
import createReactClass from 'create-react-class';

var  MyNavbar = createReactClass({
  
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            Chris Zelenka
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav onSelect={this.props.handleTabs}>
            <NavItem className={(this.props.activeTab === 1) ? "active" : ""} eventKey={1} href="#">Home</NavItem>
            <NavItem className={(this.props.activeTab === 2) ? "active" : ""} eventKey={2} href="#">Portfolio</NavItem>
            <NavItem className={(this.props.activeTab === 3) ? "active" : ""} eventKey={3} href="#">Resume</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
});

export default MyNavbar;
