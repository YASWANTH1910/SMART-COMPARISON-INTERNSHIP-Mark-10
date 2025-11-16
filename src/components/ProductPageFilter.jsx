import React, { useState, useEffect, useMemo } from "react";
import "./ProductFilterPage.css";   

const MAIN_CATEGORIES = [
  { value: "All", label: "All Products" },
  { value: "Electronics", label: "Electronics" },
  { value: "Furniture", label: "Furniture" },
  { value: "Automobiles", label: "Automobiles" },
  { value: "SkincareandBeauty", label: "Skincare & Beauty" },
  
];

const SUBCATEGORIES = {
  Electronics: [
    { value: "All", label: "All Electronics" },
    { value: "Mobiles", label: "Mobiles" },
    { value: "Laptops", label: "Laptops" },
    { value: "Headphones", label: "Headphones" },
    { value: "Watches", label: "Watches" },
    { value: "Home Appliances", label: "Home Appliances" },
  ],

  Automobiles: [
    { value: "All", label: "All Automobiles" },
    { value: "Cars", label: "Cars" },
    { value: "Bikes", label: "Bikes" },
  ],
   
  Furniture: [
    { value: "All", label: "All Appliances" },
    { value: "Beds", label: "Beds" },
    { value: "Couches", label: "Couches" },
    { value: "Tables", label: "Tables" },
    { value: "Dressers", label: "Dressers" },
  ],
  
  SkincareandBeauty: [
    { value: "All", label: "All Skincare & Beauty" },
    { value: "Face Wash", label: "Face Wash" },
    { value: "Moisturizers", label: "Moisturizers" },
    { value: "Lipsticks", label: "Lipsticks" },
    { value: "Eye Shadows", label: "Eye Shadows" },
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


  const availableBrands = useMemo(() => {
    const set = new Set();
    products.forEach((p) => p.features?.Brand && set.add(p.features.Brand));
    return Array.from(set).sort();
  }, [products]);

 
  useEffect(() => {
    setCategory(currentFilter?.mainItems ?? "All");
    setSubcategory(currentFilter?.subItems ?? "All");
  }, [currentFilter]);

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

      {/* TOP HEADER: Back | Title | Apply */}
      <div className="filter-header">
        <button className="back-btn" onClick={handleClear}>
          Reset
        </button>
        <div className="filter-title">Filter</div>
        <button className="apply-header-btn" onClick={handleApply}>
          Apply
        </button>
      </div>

      {/* Category */}
      <div className="filter-group">
        <label>Category</label>
   <select value={category}onChange={(e) => setCategory(e.target.value)}>
          {MAIN_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
       
      </div>

      {/* Sub-category */}
      <div className="filter-group">
        <label>Sub-category</label>
        <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
          {subOptions.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* Sort by Price */}
      <div className="filter-group">
        <label>Sort by Price</label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="default">Default</option>
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
        </select>
      </div>

      {/* Brand */}
      <div className="filter-group">
        <label>Brand</label>
        <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
          <option value="All">All Brands</option>
          {availableBrands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Max Price */}
      <div className="filter-group">
        <label>
          Max Price: ₹{priceRange[1] === Infinity ? "Any" : priceRange[1].toLocaleString()}
        </label>
        <input
          type="range"
          min="0"
          max="200000"
          step="1000"
          value={priceRange[1] === Infinity ? 200000 : priceRange[1]}
          onChange={(e) =>
            setPriceRange([0, e.target.value === "200000" ? Infinity : Number(e.target.value)])
          }
        />
      </div>

      {/* Min Rating */}
      <div className="filter-group">
        <label>Min Rating</label>
        <select value={minRating} onChange={(e) => setMinRating(e.target.value)}>
          <option value="All">Any Rating</option>
          <option value="4.5">4.5 & above</option>
          <option value="4.0">4.0 & above</option>
          <option value="3.5">3.5 & above</option>
          <option value="3.0">3.0 & above</option>
        </select>
      </div>

    </div>
  );
}

export default ProductFilters;