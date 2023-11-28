import React from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Header() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/home">KUDOS</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <ul>
                <li className="pl-5 pr-3">
                  <NavLink to="/home">Home</NavLink>
                </li>
                <li className="pl-5 pr-3">
                  <NavLink to="/stocks">Stocks</NavLink>
                </li>
                <li className="pl-5 pr-3">
                  <NavLink to="/todays-quote">Today's Quote</NavLink>
                </li>
                <li className="pl-5 pr-3">
                  <NavLink to="/price-history">Price History</NavLink>
                </li>
                <li className="pl-5 pr-3">
                  <NavLink to="/auth">Sign In</NavLink>
                </li>
              </ul>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
