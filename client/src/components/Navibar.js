import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from "react";

class Navibar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // console.log(this.props.userList.map(x => { }))
    return (
      <Navbar
        // bg="light" 
        style={{ "backgroundColor": "#F9EAF1" }}
        expand="lg"
      >
        <Navbar.Brand href="/">Diginary</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/aipage">AI Page</Nav.Link>
            <NavDropdown title={"Signed in as: " + this.props.appPtr.state.currentUser} id="basic-nav-dropdown">
              {this.props.userList.map(x => {
                return <NavDropdown.Item
                  onClick={() => { this.props.appPtr.switchUser(x) }}
                >{x}</NavDropdown.Item>
              })}

              {/* <NavDropdown.Divider /> */}
              {/* <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-3" />
            <Button variant="outline-primary" >Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar >
    );
  }
}

export default Navibar;