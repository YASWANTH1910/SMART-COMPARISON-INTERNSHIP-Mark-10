import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./category.css";

const CategoryFilterMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuVisible &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuVisible]);

  const categories = [
    {
      id: 1,
      name: "Electronics",
      subcategories: [
        { id: 10, name: "Mobiles" },
        { id: 11, name: "Laptops" },
        { id: 12, name: "Headphones" },
        { id: 13, name: "Watches" },
        { id: 14, name: "Home Appliances" },
      ],
    },
    {
      id: 2,
      name: "Automobiles",
      subcategories: [
        { id: 15, name: "Cars" },
        { id: 16, name: "Bikes" },
      ],
    },
    {
      id: 3,
      name: "Furniture",
      subcategories: [
        { id: 17, name: "Beds" },
        { id: 18, name: "Couches" },
        { id: 19, name: "Tables" },
        { id: 20, name: "Dressers" },
      ],
    },
    {
      id: 4,
      name: "Skincare&Beauty",
      subcategories: [
        { id: 21, name: "Face Wash" },
        { id: 22, name: "Moisturizers" },
        { id: 23, name: "Lipsticks" },
        { id: 24, name: "Eye Shadows" },
      ],
    },
  ];

  // ⬇️ UPDATED: Navigate to products page with filter
  const handleCategorySelection = (main, sub) => {
    navigate("/products", {
      state: {
        filterCategory: main,
        filterSubcategory: sub,
      },
    });
    setMenuVisible(false);
  };

  const handleShowAll = () => {
    navigate("/products", {
      state: {
        filterCategory: "All",
        filterSubcategory: "All",
      },
    });
    setMenuVisible(false);
  };

  return (
    <div className="main-menu">
      <button
        className="menu-btn"
        onClick={() => setMenuVisible(!menuVisible)}
        aria-label="open category menu"
      >
        <span className="menu-line"></span>
        <span className="menu-line"></span>
        <span className="menu-line"></span>
      </button>

      {menuVisible && (
        <div ref={dropdownRef} className="category-dropdown">
          <div className="panel-header">
            <h3>Categories</h3>
          </div>

          <div className="category-list">
            <button className="all-btn" onClick={handleShowAll}>
              All Products
            </button>
          </div>

          <div className="category-container">
            {categories.map((category) => (
              <div key={category.id} className="category-section">
                <strong className="section-title">{category.name}</strong>

                <div className="subcategory-list">
                  {category.subcategories.map((subItem) => (
                    <button
                      key={subItem.id}
                      className="sub-category-options"
                      // ⬇️ navigate with main + sub
                      onClick={() =>
                        handleCategorySelection(category.name, subItem.name)
                      }
                    >
                      {subItem.name}
                    </button>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilterMenu;