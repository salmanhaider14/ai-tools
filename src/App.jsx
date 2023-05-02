import { useEffect, useRef, useState } from "react";
import Summarizer from "./pages/Summarizer";
import Grammerly from "./pages/Grammerly";
import Highlighter from "./pages/Highlighter";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
function App() {
  return (
    <Router>
      <nav class="navbar navbar-expand-lg bg-transparent">
        <div class="container-fluid">
          <a class="navbar-brand ps-5 fw-bold text-primary" href="/">
            <p>InsightfulSum</p>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto me-5 fw-bold ">
              <li class="nav-item">
                <a
                  class="nav-link active text-primary"
                  aria-current="page"
                  href="/summarizer"
                >
                  Summarizer
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active text-primary"
                  aria-current="page"
                  href="/highlighter"
                >
                  Highlighter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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
