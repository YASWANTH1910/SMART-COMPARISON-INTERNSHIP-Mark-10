import React, { useEffect, useState, useMemo } from "react";
import "./comparisonPage.css";
import { useNavigate } from "react-router-dom";
import ComparisonTable from "../components/comparisonTable";

const ComparisonPage = ({ selectedProducts }) => {
  const navigate = useNavigate();

  // 🧭 Redirect to home if not enough products selected
  useEffect(() => {
    if (!selectedProducts || selectedProducts.length < 2) {
      navigate("/");
    }
  }, [selectedProducts, navigate]);

  // 🎛️ Filter states
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  // 🧹 Clear filters
  const handleClearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setCategory("");
    setSubCategory("");
  };

  // When main category changes, clear subCategory so it doesn't block results
  useEffect(() => {
    setSubCategory("");
  }, [category]);

  // 🧮 Extract available categories & subcategories dynamically
  const categories = useMemo(() => {
    const cats = new Set(selectedProducts.map((p) => p.category || ""));
    return Array.from(cats).filter(Boolean);
  }, [selectedProducts]);

  const subCategories = useMemo(() => {
    const subs = new Set(
      selectedProducts.map((p) => p.subCategory || p.subcategory || "")
    );
    return Array.from(subs).filter(Boolean);
  }, [selectedProducts]);

  // 🔍 Apply filters
  const filteredProducts = useMemo(() => {
    return selectedProducts.filter((p) => {
      const price = Number(p.price) || 0;
      const cat = (p.category || "").toLowerCase();
      const subCat = (p.subCategory || p.subcategory || "").toLowerCase();

      const minOk = minPrice ? price >= Number(minPrice) : true;
      const maxOk = maxPrice ? price <= Number(maxPrice) : true;
      const catOk = category ? cat === category.toLowerCase() : true;
      const subOk = subCategory ? subCat === subCategory.toLowerCase() : true;

      return minOk && maxOk && catOk && subOk;
    });
  }, [selectedProducts, minPrice, maxPrice, category, subCategory]);

  // 🚫 Handle empty comparison
  if (!selectedProducts || selectedProducts.length < 2) {
    return (
      <div className="comparison-empty">
        <h2>⚠ Please select at least 2 products to compare.</h2>
      </div>
    );
  }

  return (
    <div className="comparison-page">
      {/* 🧭 Sidebar Filters */}
      <aside className="filter-sidebar">
        <div className="filter-header">
          <h3>Filters</h3>
          <span className="clear-filters-text" onClick={handleClearFilters}>
            Clear Filters
          </span>
        </div>

        <div className="filter-group">
          <label>Min Price</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="e.g. 10000"
          />
        </div>

        <div className="filter-group">
          <label>Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="e.g. 90000"
          />
        </div>

        <div className="filter-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {subCategories.length > 0 && (
          <div className="filter-group">
            <label>Sub-Category</label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="">All</option>
              {subCategories.map((sub) => (
                <option key={sub} value={sub.toLowerCase()}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={() => navigate("/products")}
          className="add-product-btn"
        >
          ➕ Add Product
        </button>

        <button onClick={() => navigate("/")} className="back-btn">
          ⬅ Back to Home
        </button>
      </aside>

      {/* 📊 Comparison Table */}
      <section className="comparison-content">
        <h2>Product Comparison</h2>
        <ComparisonTable selectedProducts={filteredProducts} />
      </section>
    </div>
  );
};

export default ComparisonPage;
