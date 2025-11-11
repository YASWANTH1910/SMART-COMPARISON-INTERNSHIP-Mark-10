import React, { useState, useEffect, useMemo } from "react";
import "./ProductFilterPage.css";

const MAIN_CATEGORIES = [
  { value: "All", label: "All Products" },
  { value: "Electronics", label: "Electronics" },
  { value: "Home Appliances", label: "Home Appliances" },
  { value: "Fashion", label: "Fashion" },
];

const SUBCATEGORIES = {
  Electronics: [
    { value: "All", label: "All Electronics" },
    { value: "Mobiles", label: "Mobiles" },
    { value: "Laptops", label: "Laptops" },
  ],
  "Home Appliances": [
    { value: "All", label: "All Appliances" },
    { value: "Refrigerators", label: "Refrigerators" },
    { value: "Washing Machines", label: "Washing Machines" },
  ],
  Fashion: [
    { value: "All", label: "All Fashion" },
    { value: "Men", label: "Men" },
  ],
};

function ProductFilters({
  products,
  currentFilter,
  onApplyFilters,
  onClearFilters,
}) {
  const [category, setCategory] = useState(currentFilter?.mainItems ?? "All");
  const [subcategory, setSubcategory] = useState(currentFilter?.subItems ?? "All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [minRating, setMinRating] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

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
    onApplyFilters({
      category,
      subcategory,
      brands: selectedBrand === "All" ? [] : [selectedBrand],
      priceRange,
      minRating: minRating === "All" ? 0 : Number(minRating),
      sortOrder,
    });
  };

  const handleClear = () => {
    setCategory("All");
    setSubcategory("All");
    setSelectedBrand("All");
    setPriceRange([0, Infinity]);
    setMinRating("All");
    setSortOrder("default");
    onClearFilters();
  };

  const subOptions = SUBCATEGORIES[category] || [{ value: "All", label: "All" }];

  return (
    <div className="product-filters">
      <div className="filters-header">
        <button className="back-arrow" onClick={() => window.history.back()}>Back</button>
        <h3>Filter</h3>
        <button className="apply-btn" onClick={handleApply}>Apply</button>
      </div>

      {/* Category */}
      <div className="filter-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {MAIN_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div className="filter-by">
        <span>Filter By</span>
        <button className="clear-all" onClick={handleClear}>Clear All</button>
      </div>

      {/* Sort by Price */}
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

      {/* Max Price */}
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

      {/* Min Rating */}
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
}

export default ProductFilters;
