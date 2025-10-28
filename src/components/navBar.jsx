import React from "react";
import "./navbar.css";
import SearchBar from "./searchBar";
import CategoryFilterMenu from "./categorymenu";
import { useNavigate } from "react-router-dom";

const Navbar = ({ compareCount = 0, onCategorySelect = () => {}, selectedProducts = [] }) => {
  const navigate = useNavigate();

  // 🧭 Compare Button Logic
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

        {/* Left: Category Menu */}
        <div className="nav-left">
          <CategoryFilterMenu onCategorySelect={onCategorySelect} />
        </div>

        {/* Logo */}
        <div
          className="nav-logo cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="logo-icon">⚡</span> QuickShop
        </div>

        {/* Search Bar */}
        <div className="nav-center">
          <SearchBar />
        </div>

        {/* Menu Links */}
        <ul className="nav-menu">
          <li><button onClick={() => navigate("/")} className="nav-link">Home</button></li>
          <li><button onClick={() => navigate("/products")} className="nav-link">Products</button></li>
          <li><button onClick={() => navigate("/contact")} className="nav-link">Contact</button></li>
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
