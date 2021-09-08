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
          <p style={{ color: 'white', fontWeight: 'bold' }}>Issue Tracker</p>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer exact to="/">
          <NavItem>
            <NavTextWrap>
              Home
            </NavTextWrap>
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/issues">
          <NavItem>
            <NavTextWrap>Issue List</NavTextWrap>
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/report">
          <NavItem>
            <NavTextWrap>Report</NavTextWrap>
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

  .navbar-nav>.active>a, .navbar-nav>.active>a:focus {
    background-color: #5b5e6f75;
    border: 1px solid #5b5e6f75;
    border-radius: 7px;
  }

  .navbar-nav>.active>a:hover {
    background-color: #5b5e6f75;
    border: 1px solid #5b5e6f75;
    border-radius: 7px;
  }
`;

const NavTextWrap = styled.span`
  color: white;
`;
