import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { HiHome, HiMail, HiPhone, HiPrinter } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="bg-light text-muted">
      {/* Top social bar */}
      <div className="border-bottom py-3">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="d-none d-lg-block">
              <span>Get connected with us on social networks:</span>
            </Col>
            <Col xs={12} lg={6} className="text-lg-end">
              <a href="#" className="me-3 text-reset" aria-label="facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="me-3 text-reset" aria-label="twitter">
                <FaTwitter />
              </a>
              <a href="#" className="me-3 text-reset" aria-label="google">
                <FaGoogle />
              </a>
              <a href="#" className="me-3 text-reset" aria-label="instagram">
                <FaInstagram />
              </a>
              <a href="#" className="me-3 text-reset" aria-label="linkedin">
                <FaLinkedin />
              </a>
              <a href="#" className="text-reset" aria-label="github">
                <FaGithub />
              </a>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main footer content */}
      <Container className="py-5 text-center text-md-start">
        <Row className="gy-4">
          <Col md={6} lg={4}>
            <h6 className="text-uppercase fw-bold mb-3">Company name</h6>
            <p>
              Here you can use rows and columns to organize your footer content.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </Col>

          <Col md={6} lg={2}>
            <h6 className="text-uppercase fw-bold mb-3">Products</h6>
            <p className="mb-2">
              <a href="#!" className="text-reset">Angular</a>
            </p>
            <p className="mb-2">
              <a href="#!" className="text-reset">React</a>
            </p>
            <p className="mb-2">
              <a href="#!" className="text-reset">Vue</a>
            </p>
            <p className="mb-0">
              <a href="#!" className="text-reset">Laravel</a>
            </p>
          </Col>

          <Col md={6} lg={2}>
            <h6 className="text-uppercase fw-bold mb-3">Useful links</h6>
            <p className="mb-2">
              <a href="#!" className="text-reset">Pricing</a>
            </p>
            <p className="mb-2">
              <a href="#!" className="text-reset">Settings</a>
            </p>
            <p className="mb-2">
              <a href="#!" className="text-reset">Orders</a>
            </p>
            <p className="mb-0">
              <a href="#!" className="text-reset">Help</a>
            </p>
          </Col>

          <Col md={6} lg={4}>
            <h6 className="text-uppercase fw-bold mb-3">Contact</h6>
            <p className="mb-2">
              <HiHome className="me-2" />
              New York, NY 10012, US
            </p>
            <p className="mb-2">
              <HiMail className="me-2" />
              info@example.com
            </p>
            <p className="mb-2">
              <HiPhone className="me-2" />
              + 01 234 567 88
            </p>
            <p className="mb-0">
              <HiPrinter className="me-2" />
              + 01 234 567 89
            </p>
          </Col>
        </Row>
      </Container>

      {/* Bottom bar */}
      <div className="text-center py-3" style={{ backgroundColor: "rgba(0,0,0,0.05)" }}>
        © 2026 Copyright:{" "}
        <a className="text-reset fw-bold" href="#">
          YourCompany.com
        </a>
      </div>
    </footer>
  )
}

export default Footer