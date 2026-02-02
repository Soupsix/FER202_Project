import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from 'react-router-dom';

const Navigationbar = () => {

  const navigate = useNavigate();

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
              <Nav.Link onClick={() => navigate("/")}>Trang chủ</Nav.Link>
              <NavDropdown title="Sản Phẩm" id="basic-nav-dropdown">
                <NavDropdown.Item href="">Len</NavDropdown.Item>
                <NavDropdown.Item href="">Hoa bó</NavDropdown.Item>
                <NavDropdown.Item href="">Cây móc</NavDropdown.Item>
                <NavDropdown.Item href="">Quà tặng</NavDropdown.Item>
                <NavDropdown.Item href="">Đồ trang trí</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={() => navigate("/about")}>Giới Thiệu</Nav.Link>
              <Nav.Link onClick={() => navigate("/blogs")}>Tin Tức</Nav.Link>
              <Nav.Link onClick={() => navigate("/contact")}>Liên hệ</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigationbar;
