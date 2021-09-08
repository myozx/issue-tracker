import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Col,
  Glyphicon,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components';
import IssueAddNavItem from './IssueAddNavItem.jsx';
import Search from './Search.jsx';
import SignInNavItem from './SignInNavItem.jsx';

export default function NavBar({ user, onUserChange }) {
  return (
    <StyledNavbar>
      <Navbar.Header>
        <Navbar.Brand>
          <p style={{
            color: 'white',
            fontWeight: 'bold',
          }}
          >
            ⚝ Issue Tracker
          </p>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer exact to="/">
          <NavItem>
            Home
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/issues">
          <NavItem>
            Issue List
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/report">
          <NavItem>
            Report
          </NavItem>
        </LinkContainer>
      </Nav>
      <Col sm={4} md={5}>
        <Navbar.Form>
          <Search />
        </Navbar.Form>
      </Col>
      <Nav pullRight>
        <IssueAddNavItem user={user} />
        <SignInNavItem user={user} onUserChange={onUserChange} />
        <NavDropdown
          id="user-dropdown"
          title={<Glyphicon glyph="option-vertical" />}
          noCaret
        >
          <MenuItem href="/about">About</MenuItem>
        </NavDropdown>
      </Nav>
    </StyledNavbar>
  );
}

const StyledNavbar = styled(Navbar)`
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: #383b4a;
  border-radius: 0px;
  border-color: transparent;
  margin-bottom: 30px;
  
  /* for home button */
  .navbar-nav>li>a, .navbar-nav>li>a:focus {
    color: white;
  }
  
  /* for sign in button */
  .navbar-nav>li>a:hover {
    color: white;
    background-color: #474b5b;
    border-radius: 7px;
  }

  /* ----- for about link ------ */
  .navbar-nav>.open>a, .navbar-nav>.open>a:focus,
  .navbar-nav>.open>a:hover {
    color: white;
    background-color: #474b5b;
    border-radius: 7px;
  }

  /* ----- for navigation links ------ */
  .navbar-nav>.active>a, .navbar-nav>.active>a:focus {
    color: white;
    font-weight: bold;
    background-color: #383b4a;
    text-decoration: underline;
  }

  .navbar-nav>.active>a:hover {
    color: white;
    background-color: #5b5e6f75;
    border-radius: 7px;
  }
`;
