import React, { useState, useEffect } from "react";
import "./ProductFilterPage.css";

const ProductFilters = ({
  products,
  onApplyFilters,
  onClearFilters,
  currentFilter,
}) => {
  const [openSections, setOpenSections] = useState({
    category: true,
    subcategory: false,
    brand: false,
    price: false,
    rating: false,
  });

  const [selected, setSelected] = useState({
    category: currentFilter.mainItems || "All",
    subcategory: currentFilter.subItems || "All",
    brands: [],
    priceRange: [0, 200000],
    minRating: 0,
  });

  // Extract brands & subcategories
  const allBrands = [...new Set(products.map(p => p.features.Brand))].filter(Boolean);
  const subcategories = selected.category === "All"
    ? []
    : [...new Set(products
        .filter(p => p.category === selected.category)
        .map(p => p.subcategory)
      )];

  useEffect(() => {
    setSelected(prev => ({
      ...prev,
      subcategory: subcategories.includes(prev.subcategory) ? prev.subcategory : "All"
    }));
  }, [selected.category, subcategories]);

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleBrandToggle = (brand) => {
    setSelected(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const handleApply = () => {
    onApplyFilters(selected);
  };

  const handleClear = () => {
    const cleared = {
      category: "All",
      subcategory: "All",
      brands: [],
      priceRange: [0, 200000],
      minRating: 0,
    };
    setSelected(cleared);
    onClearFilters();
  };

  return (
    <div className="product-filters">
      <div className="filters-header">
        <button className="back-arrow" onClick={() => window.history.back()}>Back</button>
        <h3>Filter</h3>
        <button className="apply-btn" onClick={handleApply}>Apply</button>
      </div>

      <div className="sort-section">
        <label>Sort By</label>
        <select defaultValue="featured">
          <option value="featured">Featured Items</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div className="filter-by">
        <span>Filter By</span>
        <button className="clear-all" onClick={handleClear}>Clear All</button>
      </div>

      {/* Category */}
      <div className="filter-group">
        <div className="filter-title" onClick={() => toggleSection("category")}>
          <span>Category</span>
          <span>{openSections.category ? "−" : "+"}</span>
        </div>
        {openSections.category && (
          <div className="filter-options">
            {["All", "Electronics", "Home Appliances", "Fashion"].map(cat => (
              <label key={cat} className="checkbox-label">
                <input
                  type="radio"
                  name="category"
                  checked={selected.category === cat}
                  onChange={() => setSelected(prev => ({ ...prev, category: cat }))}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Subcategory */}
      {selected.category !== "All" && (
        <div className="filter-group">
          <div className="filter-title" onClick={() => toggleSection("subcategory")}>
            <span>Subcategory</span>
            <span>{openSections.subcategory ? "−" : "+"}</span>
          </div>
          {openSections.subcategory && (
            <div className="filter-options">
              {["All", ...subcategories].map(sub => (
                <label key={sub} className="checkbox-label">
                  <input
                    type="radio"
                    name="subcategory"
                    checked={selected.subcategory === sub}
                    onChange={() => setSelected(prev => ({ ...prev, subcategory: sub }))}
                  />
                  <span>{sub}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Brand */}
      <div className="filter-group">
        <div className="filter-title" onClick={() => toggleSection("brand")}>
          <span>Brand</span>
          <span>{openSections.brand ? "−" : "+"}</span>
        </div>
        {openSections.brand && (
          <div className="filter-options">
            {allBrands.map(brand => (
              <label key={brand} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selected.brands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="filter-group">
        <div className="filter-title" onClick={() => toggleSection("price")}>
          <span>Price Range</span>
          <span>{openSections.price ? "−" : "+"}</span>
        </div>
        {openSections.price && (
          <div className="filter-options price-range">
            <input
              type="range"
              min="0"
              max="200000"
              step="1000"
              value={selected.priceRange[1]}
              onChange={(e) => setSelected(prev => ({
                ...prev,
                priceRange: [0, parseInt(e.target.value)]
              }))}
            />
            <div className="price-values">
              <span>₹0</span>
              <span>₹{selected.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="filter-group">
        <div className="filter-title" onClick={() => toggleSection("rating")}>
          <span>Minimum Rating</span>
          <span>{openSections.rating ? "−" : "+"}</span>
        </div>
        {openSections.rating && (
          <div className="filter-options">
            {[0, 3, 4].map(rating => (
              <label key={rating} className="checkbox-label">
                <input
                  type="radio"
                  name="rating"
                  checked={selected.minRating === rating}
                  onChange={() => setSelected(prev => ({ ...prev, minRating: rating }))}
                />
                <span>{rating === 0 ? "Any" : `${rating}★ & up`}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;