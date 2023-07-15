import Summarizer from "./pages/Summarizer";
import Highlighter from "./pages/Highlighter";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function App() {
  return (
    <Router>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand
            href="/"
            className="fw-bold"
            style={{ color: "#19376d" }}
          >
            InsightfulSum
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className=" ms-auto fw-bold">
              <Nav.Link href="/summarizer" style={{ color: "#19376d" }}>
                Summarizer
              </Nav.Link>
              <Nav.Link href="/highlighter" style={{ color: "#19376d" }}>
                Highlighter
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summarizer" element={<Summarizer />} />
        <Route path="/highlighter" element={<Highlighter />} />
      </Routes>
      <footer className="mb-5">
        <p
          className="text-center fs-4 fw-semibold "
          style={{ color: "#19376d" }}
        >
          Copyright © 2023 InsightfulSum. All rights reserved.
        </p>
      </footer>
    </Router>
  );
}

export default App;
