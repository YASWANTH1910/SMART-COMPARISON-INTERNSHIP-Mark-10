import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
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

  // Ensure login persists after refresh
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

  // Add proper logout persistence
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
    <nav
      className="navbar"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        pointerEvents: "auto",
      }}
    >
      <div
        className="nav-container"
        style={{ position: "relative", zIndex: 11, pointerEvents: "auto" }}
      >
        {/* Left: Category Menu */}
        <div className="nav-left" style={{ pointerEvents: "auto" }}>
          <CategoryFilterMenu onCategorySelect={onCategorySelect} />
        </div>

        {/* Logo */}
        <div
          className="nav-logo cursor-pointer"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer", pointerEvents: "auto" }}
        >
          <span className="logo-icon">⌬ </span> CompariSmart
        </div>

        {/* Center: Search */}
        <div className="nav-center" style={{ pointerEvents: "auto" }}>
          <SearchBar />
        </div>

        {/* Main buttons */}
        <div className="nav-actions" style={{ pointerEvents: "auto" }}>
          <ul className="nav-menu">
            <li>
              <button onClick={() => navigate("/")} className="nav-link-btn" type="button">
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/products")}
                className="nav-link-btn"
                type="button"
              >
                Products
              </button>
            </li>
          </ul>

          {/* Compare button */}
          <div className="nav-right" style={{ pointerEvents: "auto" }}>
            <button
              type="button"
              className="compare-btn-navbar"
              onClick={handleCompareClick}
              aria-label="Compare selected products"
            >
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
              onClick={handleLoginLogout}
              style={{ pointerEvents: "auto", position: "relative" }}
            >
              <FaUserCircle className="user-icon" />
              {showDropdown && (
                <div className="user-dropdown" style={{ pointerEvents: "auto" }}>
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
