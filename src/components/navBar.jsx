import React, { useState } from "react";
import "./navbar.css";
import SearchBar from "./searchBar"; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-icon">⚡</span>
          QuickShop
        </div>

        {/* console.log("✅ Rendering Navbar component..."); */}
        {/* <h2 style={{ color: "red" }}>TEST NAVBAR</h2> */}


        {/* ✅ Move SearchBar here temporarily to test visibility */}
        <SearchBar />

        {/* Navigation Menu */}
        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <a href="#home" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="#products" className="nav-link">Products</a>
          </li>
          <li className="nav-item">
            <a href="#deals" className="nav-link nav-highlight">Deals</a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link">About</a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link">Contact</a>
          </li>
        </ul>

        {/* ✅ Keep icons section for testing layout */}
        <div className="nav-icons">
          <button className="icon-btn" aria-label="favorites">
            <span className="icon">❤️</span>
          </button>
          <button className="icon-btn" aria-label="cart">
            <span className="icon">🛒</span>
            <span className="cart-count">0</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
