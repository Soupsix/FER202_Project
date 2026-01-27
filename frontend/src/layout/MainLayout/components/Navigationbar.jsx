import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Navigationbar = () => {
  return (
    <>
      <Navbar className="bg-body-tertiary" >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center"
          >
            <Nav className="fw-bold">
              <Nav.Link href="#home">Trang chủ</Nav.Link>
               <NavDropdown title="Sản Phẩm" id="basic-nav-dropdown">
                <NavDropdown.Item href="">Action</NavDropdown.Item>
                <NavDropdown.Item href="">Another action</NavDropdown.Item>
                <NavDropdown.Item href="">Something</NavDropdown.Item>
                <NavDropdown.Item href="">Separated link</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#link">Giới Thiệu</Nav.Link>
              <Nav.Link href="#link">Tin Tức</Nav.Link> 
              <Nav.Link href="#link">Liên hệ</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigationbar;
