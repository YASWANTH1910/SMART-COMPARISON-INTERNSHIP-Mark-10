import React, { useState } from "react";
import "./navbar.css";
import SearchBar from "./searchBar";
import CategoryFilterMenu from "./categorymenu";

const Navbar = ({ onCategorySelect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        
        {/* 🧭 Left: Category Filter */}
        <div className="nav-left">
          <CategoryFilterMenu onCategorySelect={onCategorySelect} />
        </div>

        {/* ⚡ Logo */}
        <div className="nav-logo">
          <span className="logo-icon">⚡</span>
          QuickShop
        </div>

        {/* 🔍 Center: Search Bar */}
        <div className="nav-center">
          <SearchBar />
        </div>

        {/* 🔽 Mobile menu toggle (only visible on small screens) */}
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* 📂 Nav items */}
        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <a href="#home" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="#products" className="nav-link">Products</a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link">Contact</a>
          </li>
        </ul>

        {/* 🟠 Right: Compare button */}
        <div className="nav-right">
          <button className="compare-btn">
            Compare <span className="compare-count">2</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
