import React from "react";
import "./navbar.css";
import SearchBar from "./searchBar";
import CategoryFilterMenu from "./categorymenu";
import { useNavigate } from "react-router-dom";

const Navbar = ({ compareCount, onCategorySelect, selectedProducts }) => {
  const navigate = useNavigate();

  const handleCompareClick = () => {
    if (selectedProducts.length < 2) {
      alert("Select at least 2 products to compare!");
      return;
    }
    navigate("/compare");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Left: Category menu */}
        <div className="nav-left">
          <CategoryFilterMenu onCategorySelect={onCategorySelect} />
        </div>

        {/* Logo */}
        <div className="nav-logo">
          <span className="logo-icon">⚡</span> QuickShop
        </div>

        {/* Search Bar */}
        <div className="nav-center">
          <SearchBar />
        </div>

        {/* Menu Links */}
        <ul className="nav-menu">
          <li><a href="#home" className="nav-link">Home</a></li>
          <li><a href="#products" className="nav-link">Products</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>

        {/* Compare Button */}
        <div className="nav-right">
          <button className="compare-btn-navbar" onClick={handleCompareClick}>
            Compare
            {compareCount > 0 && (
              <span className="compare-count">{compareCount}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
