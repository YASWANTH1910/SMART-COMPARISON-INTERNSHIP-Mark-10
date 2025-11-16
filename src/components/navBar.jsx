import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import SearchBar from "./searchBar";
import CategoryFilterMenu from "./categorymenu";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({
  compareCount = 0,
  onCategorySelect = () => {},
  selectedProducts = [],
  isLoggedIn,      // <- must be provided by App.jsx
  setIsLoggedIn,   // <- must be provided by App.jsx
}) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // ✅ Ensure login persists after refresh
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleCompareClick = () => {
    if (selectedProducts.length < 2) {
      alert("Select at least 2 products to compare!");
      return;
    }
    navigate("/compare");
  };

  // ✅ Add proper logout persistence
  const handleLoginLogout = (e) => {
    e.stopPropagation();
    if (isLoggedIn) {
      localStorage.removeItem("isLoggedIn"); 
      setIsLoggedIn(false);
      alert("Logged out successfully!");
      navigate("/");
    } else {
      navigate("/login");
    }
    setShowDropdown(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Left: Category Menu */}
        <div className="nav-left">
          <CategoryFilterMenu onCategorySelect={onCategorySelect} />
        </div>

        {/* Logo */}
        <div className="nav-logo cursor-pointer" onClick={() => navigate("/")}>
          <span className="logo-icon">⚡</span> QuickShop
        </div>

        {/* Center: Search */}
        <div className="nav-center">
          <SearchBar />
        </div>

        {/* Main buttons */}
        <div className="nav-actions">
          <ul className="nav-menu">
            <li>
              <button onClick={() => navigate("/")} className="nav-link-btn">
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/products")}
                className="nav-link-btn"
              >
                Products
              </button>
            </li>
          </ul>

          {/* Compare button */}
          <div className="nav-right">
            <button className="compare-btn-navbar" onClick={handleCompareClick}>
              Compare
              {compareCount > 0 && (
                <span className="compare-count">{compareCount}</span>
              )}
            </button>

            {/* User icon with dropdown */}
            <div
              className="user-icon-container"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
              onClick={handleLoginLogout}>
              <FaUserCircle className="user-icon" />
              {showDropdown && (
                <div className="user-dropdown">
                  {isLoggedIn ? "Logout" : "Login"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;